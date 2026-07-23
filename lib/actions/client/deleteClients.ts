"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { clientId } from "@/lib/schemas/client";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { deleteClients as deleteClientsQuery } from "@/lib/data/client/client.dal";

const clientIds = z.array(clientId).min(1);

export async function deleteClients(ids: number[]): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const parsedIds = clientIds.parse(ids);

    await deleteClientsQuery(parsedIds);

    return {
      status: "success",
      message: t("client.deleteMany.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("client.deleteMany.error.internalServerError"),
    };
  }
}
