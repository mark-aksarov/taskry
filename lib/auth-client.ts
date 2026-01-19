import { auth } from "./auth";
import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { ac, admin, owner, user, guest } from "@/lib/permissions";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles: {
        admin,
        owner,
        user,
        guest,
      },
    }),
    inferAdditionalFields<typeof auth>(),
  ],
});
