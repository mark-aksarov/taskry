"use server";

import z from "zod";
import { getTranslations } from "next-intl/server";
import { ActionState, UpdateClientImageUrlPayload } from "../types";
import { clientId, clientImageUrl } from "@/lib/schemas/client";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { updateClientImageUrl as updateClientImageUrlQuery } from "@/lib/data/client/client.dal";

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

  try {
    const parsedData = schema.parse(payload);

    await updateClientImageUrlQuery(parsedData);

    return {
      status: "success",
      message: t("client.updateImageUrl.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("client.updateImageUrl.error.internalServerError"),
    };
  }
}
