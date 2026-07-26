"use server";

import { redirect } from "@/i18n/navigation";
import { clientId } from "@/lib/schemas/client";
import { ActionState, DeleteClientPayload } from "../types";
import { getLocale, getTranslations } from "next-intl/server";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { deleteClients as deleteClientsQuery } from "@/lib/data/client/client.dal";

export async function deleteClient(
  payload: DeleteClientPayload,
): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t("client.delete.error.internalServerError");

  // Validation
  const result = clientId.safeParse(payload.id);

  if (!result.success) {
    return {
      status: "error",
      // This value does not come from a user form, so the user cannot fix invalid input
      message: internalServerError,
    };
  }

  // Delete client
  try {
    await deleteClientsQuery([result.data]);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  // Success
  const locale = await getLocale();

  // Redirect to clients page when client is deleted from profile page
  if (payload.shouldRedirect) {
    redirect({ href: "/clients", locale });
  }

  return {
    status: "success",
    message: t("client.delete.success"),
  };
}
