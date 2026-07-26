"use server";

import z from "zod";
import { getTranslations } from "next-intl/server";
import { userId, userImageUrl } from "@/lib/schemas/user";
import { ActionState, UpdateUserImageUrlPayload } from "../types";
import { verifyProtectedPageSession } from "@/lib/utils/verifyProtectedPageSession";
import { updateUser as updateUserQuery } from "@/lib/data/user/user.dal";

const schema = z.object({
  id: userId,
  imageUrl: userImageUrl.nullable(),
});

export async function updateUserImageUrl(
  payload: UpdateUserImageUrlPayload,
): Promise<ActionState> {
  // Authorization
  await verifyProtectedPageSession();

  const t = await getTranslations("actions");
  const internalServerError = t(
    "user.updateImageUrl.error.internalServerError",
  );

  // Validation
  const result = schema.safeParse(payload);

  if (!result.success) {
    return {
      status: "error",
      // Show a generic error because the user cannot fix invalid id manually
      message: internalServerError,
    };
  }

  // Update user in database
  try {
    await updateUserQuery(result.data);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  return {
    status: "success",
    message: t("user.updateImageUrl.success"),
  };
}
