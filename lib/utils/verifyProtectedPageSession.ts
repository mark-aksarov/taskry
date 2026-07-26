import "server-only";

import { getSession } from "../data/utils/getSession";
import { redirectUnauthenticatedToSignIn } from "./redirectUnauthenticatedToSignIn";
import { redirectAuthenticatedToVerifyEmail } from "./redirectAuthenticatedToVerifyEmail";
import { redirectAuthenticatedToCreateOrganization } from "./redirectAuthenticatedToCreateOrganization";

export const verifyProtectedPageSession = async () => {
  const session = await getSession();

  await redirectUnauthenticatedToSignIn();
  await redirectAuthenticatedToVerifyEmail();
  await redirectAuthenticatedToCreateOrganization();

  return session!;
};
