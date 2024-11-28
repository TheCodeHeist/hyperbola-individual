import { setupTwoFactorAuthentication } from "$lib/server/auth_handler";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async (event) => {
    try {
      const session = event.locals.session;

      if (!session) {
        return fail(401, { success: false, error: "Unauthorized" });
      }

      let qrcodeDataURI = await setupTwoFactorAuthentication(session.id);

      return {
        success: true,
        qrcodeDataURI,
      };
    } catch (error) {
      return fail(500, { success: false, error: "Failed to generate QR Code" });
    }
  },
};
