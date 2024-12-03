import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { Collection, MongoClient } from "mongodb";
import { DB_NAME, type SessionDoc, type UserDoc } from "$lib/db_schemas";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import db from "./db";

const Session = db.collection("sessions") as Collection<SessionDoc>;
const User = db.collection("users") as Collection<UserDoc>;

const adapter = new MongodbAdapter(Session, User);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !dev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      firstName: attributes.firstName,
      lastName: attributes.lastName,
      email: attributes.email,
      setupTwoFactor: attributes.two_factor_secret !== null,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      firstName: string;
      lastName: string;
      email: string;
      two_factor_secret: string | null;
    };
  }
}
