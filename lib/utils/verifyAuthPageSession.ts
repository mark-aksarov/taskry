import "server-only";

import { redirectAuthenticatedToDashboard } from "./redirectAuthenticatedToDashboard";
import { redirectAuthenticatedToVerifyEmail } from "./redirectAuthenticatedToVerifyEmail";
import { redirectAuthenticatedToCreateOrganization } from "./redirectAuthenticatedToCreateOrganization";

export const verifyAuthPageSession = async () => {
  await redirectAuthenticatedToVerifyEmail();
  await redirectAuthenticatedToCreateOrganization();
  await redirectAuthenticatedToDashboard();
};
