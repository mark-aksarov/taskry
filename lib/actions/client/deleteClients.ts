"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { clientId } from "@/lib/schemas/client";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { deleteClients as deleteClientsQuery } from "@/lib/data/client/client.dal";

const clientIds = z.array(clientId).min(1);

export async function deleteClients(ids: number[]): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t("client.deleteMany.error.internalServerError");

  // Validation
  const result = clientIds.safeParse(ids);

  if (!result.success) {
    return {
      status: "error",
      // This ids does not come from a user form, so the user cannot fix invalid input
      message: internalServerError,
    };
  }

  // Delete clients
  try {
    await deleteClientsQuery(result.data);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  return {
    status: "success",
    message: t("client.deleteMany.success"),
  };
}
