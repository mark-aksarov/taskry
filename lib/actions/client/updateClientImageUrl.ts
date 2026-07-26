"use server";

import z from "zod";
import { getTranslations } from "next-intl/server";
import { clientId, clientImageUrl } from "@/lib/schemas/client";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { ActionState, UpdateClientImageUrlPayload } from "../types";
import { updateClient as updateClientQuery } from "@/lib/data/client/client.dal";

const schema = z.object({
  id: clientId,
  imageUrl: clientImageUrl.nullable(),
});

export async function updateClientImageUrl(
  payload: UpdateClientImageUrlPayload,
): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t(
    "client.updateImageUrl.error.internalServerError",
  );

  // Validation
  const result = schema.safeParse(payload);

  if (!result.success) {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  // Update client
  try {
    await updateClientQuery(result.data);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  return {
    status: "success",
    message: t("client.updateImageUrl.success"),
  };
}
