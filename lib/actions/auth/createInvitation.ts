"use server";

import z from "zod";
import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { headers } from "next/headers";
import { userEmail } from "@/lib/schemas/user";
import { getTranslations } from "next-intl/server";
import { handleBetterAuthError } from "@/lib/utils/actionErrors";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { validateUserHasNoMembership } from "@/lib/data/utils/validation";

const schema = z.object({
  email: userEmail,
});

export async function createInvitation(
  formData: FormData,
): Promise<ActionState> {
  const t = await getTranslations("actions");
  const internalServerError = t("createInvitation.error.internalServerError");

  // Authorization
  const session = await requireFullAccess();

  // Get active organization
  const organizationId = session.session.activeOrganizationId;

  if (!organizationId) {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  // Validation. Check if form data is valid
  const input = Object.fromEntries(formData.entries());
  const result = schema.safeParse(input);

  if (!result.success) {
    return {
      status: "error",
      message: t("common.error.invalidData"),
    };
  }

  const { email } = result.data;

  //  Check if user already belongs to another organization
  try {
    await validateUserHasNoMembership(email);
  } catch {
    return {
      status: "error",
      message: t("createInvitation.error.alreadyInOrganization"),
    };
  }

  // Create invitation
  try {
    await auth.api.createInvitation({
      body: {
        email,
        role: "member",
        organizationId,
        resend: true,
      },
      headers: await headers(),
    });
  } catch (error: unknown) {
    return handleBetterAuthError(error, internalServerError);
  }

  // Success
  return {
    status: "success",
    message: t("createInvitation.success"),
  };
}
