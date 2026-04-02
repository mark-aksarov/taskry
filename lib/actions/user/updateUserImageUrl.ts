"use server";

import z from "zod";
import { getTranslations } from "next-intl/server";
import { userId, userImageUrl } from "@/lib/schemas/user";
import { ActionState, UpdateUserImageUrlPayload } from "../types";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { updateUserImageUrl as updateUserImageUrlQuery } from "@/lib/data/user/user.service";

const schema = z.object({
  id: userId,
  imageUrl: userImageUrl.nullable(),
});

export async function updateUserImageUrl(
  payload: UpdateUserImageUrlPayload,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedData = schema.parse(payload);

    await updateUserImageUrlQuery(parsedData);

    return {
      status: "success",
      message: t("user.updateImageUrl.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("user.updateImageUrl.error.internalServerError"),
    };
  }
}
