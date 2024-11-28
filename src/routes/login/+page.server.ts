import { isValidEmail } from "$lib/util";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { hash } from "@node-rs/argon2";
import db from "$lib/server/db";
import { generateIdFromEntropySize } from "lucia";
import { lucia } from "$lib/server/auth";
import type { ObjectId } from "mongodb";
import {
  continueLoginWithTwoFactorAuthentication,
  login,
} from "$lib/server/auth_handler";

export const actions: Actions = {
  login: async (event) => {
    let formData = await event.request.formData();

    let email = formData.get("email");
    let password = formData.get("password");

    // Null check
    if (!email || !password) {
      return fail(400, {
        success: false,
        missing: true,
      });
    }

    // Type check
    if (typeof email !== "string" || typeof password !== "string") {
      return fail(400, {
        success: false,
        invalid: true,
        email: email.toString(),
      });
    }

    if (!isValidEmail(email)) {
      return fail(400, {
        success: false,
        email: email.toString(),
        invalid: true,
      });
    }

    try {
      let response = await login(email, password);

      if (!response.success) {
        return fail(401, {
          success: false,
          invalid: true,
          email: email.toString(),
        });
      }

      if (response.twoFactorRequired) {
        return {
          success: true,
          twoFactorRequired: true,
          email: email.toString(),
        };
      }

      event.cookies.set(
        response.sessionCookie?.name as string,
        response.sessionCookie?.value as string,
        {
          path: "/",
          ...(response.sessionCookie?.attributes as Record<string, string>),
        }
      );

      // return { success: true };
    } catch (error) {
      console.error("Failed to create user:", error);
      return fail(500, { success: false, error, email: email.toString() });
    }

    return redirect(303, "/dashboard");
  },
  verifyOtp: async (event) => {
    let formData = await event.request.formData();

    let otp = formData.get("otp");
    let email = formData.get("email");

    // Null check
    if (!otp || !email) {
      console.debug("Value of otp:", otp);
      console.debug("Value of email:", email);
      return fail(400, { success: false, missing: true });
    }

    // Type check
    if (typeof otp !== "string" || typeof email !== "string") {
      console.debug("Type of otp:", typeof otp);
      console.debug("Type of email:", typeof email);
      return fail(400, { success: false, invalid: true });
    }

    if (!isValidEmail(email)) {
      return fail(400, {
        success: false,
        email: email.toString(),
        invalid: true,
      });
    }

    try {
      let response = await continueLoginWithTwoFactorAuthentication(email, otp);

      if (!response.success) {
        return fail(401, { success: false, invalid: true });
      }

      event.cookies.set(
        response.sessionCookie?.name as string,
        response.sessionCookie?.value as string,
        {
          path: "/",
          ...(response.sessionCookie?.attributes as Record<string, string>),
        }
      );
    } catch (error) {
      console.error("Failed to create user:", error);
      return fail(500, { success: false, error });
    }

    return redirect(303, "/dashboard");
  },
} satisfies Actions;
