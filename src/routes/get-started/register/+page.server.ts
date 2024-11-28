import { isValidEmail } from "$lib/util";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { hash } from "@node-rs/argon2";
import db from "$lib/server/db";
import { generateIdFromEntropySize } from "lucia";
import { lucia } from "$lib/server/auth";
import type { ObjectId } from "mongodb";
import { register } from "$lib/server/auth_handler";

export const actions = {
  default: async (event) => {
    let formData = await event.request.formData();

    let firstName = formData.get("firstName");
    let lastName = formData.get("lastName");
    let email = formData.get("email");
    let password = formData.get("password");
    let confirmPassword = formData.get("confirmPassword");

    // Null check
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return fail(400, { missing: true });
    }

    // Type check
    if (
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof confirmPassword !== "string"
    ) {
      return fail(400, { invalid: true });
    }

    if (!isValidEmail(email)) {
      return fail(400, { email: email.toString(), invalid: true });
    }

    if (password.length < 8) {
      return fail(400, { email: email.toString(), pwTooShort: true });
    }

    if (password !== confirmPassword) {
      return fail(400, {
        email: email.toString(),
        mismatch: true,
      });
    }

    try {
      let sessionCookie = await register(firstName, lastName, email, password);

      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: "/",
        ...sessionCookie.attributes,
      });

      // return { success: true };
    } catch (error) {
      console.error("Failed to create user:", error);
      return fail(500, { error, email: email.toString() });
    }

    return redirect(302, "/setup2fa");
  },
} satisfies Actions;
