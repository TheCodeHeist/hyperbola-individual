import { lucia } from "$lib/server/auth";
import db from "$lib/server/db";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get(lucia.sessionCookieName);

  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;

    if ((await db.collection("users").countDocuments()) === 0) {
      if (
        event.url.pathname.startsWith("/dashboard") ||
        event.url.pathname === "/login"
      ) {
        return redirect(302, "/welcome");
      }
    } else if (
      (event.url.pathname.startsWith("/dashboard") ||
        event.url.pathname === "/welcome" ||
        event.url.pathname.startsWith("/get-started")) &&
      event.url.pathname !== "/login"
    ) {
      return redirect(302, "/login");
    }
    // }

    return resolve(event);
  }

  const { session, user } = await lucia.validateSession(sessionId);

  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);

    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
  }

  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();

    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
  }

  event.locals.user = user;
  event.locals.session = session;

  // Route-specific logic
  if (
    event.url.pathname === "/welcome" ||
    event.url.pathname.startsWith("/get-started") ||
    event.url.pathname === "/welcome" ||
    event.url.pathname === "/login"
  ) {
    redirect(302, "/dashboard");
  }

  return resolve(event);
};
