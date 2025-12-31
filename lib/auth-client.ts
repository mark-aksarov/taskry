import { auth } from "./auth";
import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { ac, admin, owner, manager, user, guest } from "@/lib/permissions";

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles: {
        admin,
        owner,
        manager,
        user,
        guest,
      },
    }),
    inferAdditionalFields<typeof auth>(),
  ],
});
