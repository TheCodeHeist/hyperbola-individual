import { logout } from "$lib/server/auth_handler";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async (event) => {
    try {
      let sessionCookie = await logout(event.locals.session);

      if (!sessionCookie) {
        return fail(401);
      }

      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes,
      });
    } catch (e) {
      console.error(e);
      return fail(500);
    }

    return redirect(302, "/login");
  },
};
