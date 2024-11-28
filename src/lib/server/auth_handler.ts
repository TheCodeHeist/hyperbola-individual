import { hash, verify } from "@node-rs/argon2";
import { generateIdFromEntropySize, type Session } from "lucia";
import { lucia } from "./auth";
import type { ObjectId } from "mongodb";
import db from "./db";
import type { UserDoc } from "$lib/db_schemas";
import { createTOTPKeyURI, TOTPController } from "oslo/otp";
import qrcode from "qrcode";
import { decodeHex } from "oslo/encoding";

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  const userId = generateIdFromEntropySize(10);

  await db.collection("users").insertOne({
    _id: userId as unknown as ObjectId,
    firstName,
    lastName,
    email,
    passwordHash,
    two_factor_secret: null,
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  return sessionCookie;
};

export const login = async (email: string, password: string) => {
  const user = await db.collection("users").findOne({ email });

  if (!user) {
    return {
      success: false,
      sessionCookie: null,
    };
  }

  const validPassword = await verify(user.passwordHash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  if (!validPassword) {
    return {
      success: false,
      sessionCookie: null,
    };
  }

  if (user.two_factor_secret) {
    return {
      success: true,
      twoFactorRequired: true,
      userId: user._id.toString(),
    };
  } else {
    const session = await lucia.createSession(user._id.toString(), {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    return {
      success: true,
      sessionCookie,
    };
  }
};

export const logout = async (session: Session | null) => {
  if (!session) {
    return null;
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  return sessionCookie;
};

export const setupTwoFactorAuthentication = async (sessionId: string) => {
  const { user } = await lucia.validateSession(sessionId);

  if (!user) {
    return null;
  }

  console.debug("User ID:", user.id);

  const twoFactorSecret = crypto.getRandomValues(new Uint8Array(20));
  await db
    .collection("users")
    .updateOne(
      { _id: user.id as unknown as ObjectId },
      { $set: { two_factor_secret: twoFactorSecret } }
    );

  const uri = createTOTPKeyURI(
    "Hyperbola Individual",
    user.email,
    twoFactorSecret
  );

  const qr = await qrcode.toDataURL(uri);

  return qr;
};

export const verifyTwoFactorAuthentication = async (
  email: string,
  otp: string
) => {
  const user = await db.collection("users").findOne({
    email,
  });

  if (!user) {
    return {
      success: false,
    };
  }

  // console.debug("OTP:", otp, typeof otp);
  // console.debug(
  //   "2fa secret:",
  //   user.two_factor_secret.buffer,
  //   typeof user.two_factor_secret.buffer
  // );
  // console.debug(
  //   "Decoded 2fa secret:",
  //   decodeHex(user.two_factor_secret.buffer),
  //   typeof decodeHex(user.two_factor_secret.buffer)
  // );

  const validOTP = await new TOTPController().verify(
    otp,
    user.two_factor_secret.buffer
  );

  return { success: true, validOTP, userId: user._id.toString() };
};

export const continueLoginWithTwoFactorAuthentication = async (
  email: string,
  otp: string
) => {
  const { validOTP, userId, success } = await verifyTwoFactorAuthentication(
    email,
    otp
  );

  if (!success) {
    console.debug("User not found");
    return {
      success: false,
      sessionCookie: null,
    };
  }

  if (!validOTP) {
    console.debug("Invalid OTP");
    return {
      success: false,
      sessionCookie: null,
    };
  }

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  return {
    success: true,
    sessionCookie,
  };
};
