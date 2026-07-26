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

  // Validation
  const input = Object.fromEntries(formData.entries());
  const result = createClientSchema.safeParse(input);

  if (!result.success) {
    return {
      status: "error",
      message: t("common.error.invalidData"),
    };
  }

  // Create client
  try {
    await createClientsQuery([result.data]);
  } catch {
    return {
      status: "error",
      message: t("client.create.error.internalServerError"),
    };
  }

  return {
    status: "success",
    message: t("client.create.success"),
  };
}
