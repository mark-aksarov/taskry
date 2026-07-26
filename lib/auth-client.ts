import { auth } from "./auth";
import { ac, owner, member } from "./permissions";
import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    organizationClient({
      ac,
      roles: {
        owner,
        member,
      },
    }),
    inferAdditionalFields<typeof auth>(),
  ],
});
