"use server";

import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { createClientSchema } from "@/lib/schemas/client";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { createClients as createClientsQuery } from "@/lib/data/client/client.dal";

export async function createClient(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = createClientSchema.parse(input);

    await createClientsQuery([parsedData]);

    return {
      status: "success",
      message: t("client.create.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("client.create.error.internalServerError"),
    };
  }
}
