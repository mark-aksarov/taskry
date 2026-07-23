"use server";

import { redirect } from "@/i18n/navigation";
import { clientId } from "@/lib/schemas/client";
import { getLocale, getTranslations } from "next-intl/server";
import { ActionState, DeleteClientPayload } from "../types";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { deleteClients as deleteClientsQuery } from "@/lib/data/client/client.dal";

export async function deleteClient(
  payload: DeleteClientPayload,
): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const parsedId = clientId.parse(payload.id);

    await deleteClientsQuery([parsedId]);
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("client.delete.error.internalServerError"),
    };
  }

  const locale = await getLocale();

  if (payload.shouldRedirect) {
    redirect({ href: "/clients", locale });
  }

  return {
    status: "success",
    message: t("client.delete.success"),
  };
}
