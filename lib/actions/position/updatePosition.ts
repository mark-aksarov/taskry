"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { positionId, positionName } from "@/lib/schemas/position";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { updatePosition as updatePositionQuery } from "@/lib/data/position/position.dal";

const schema = z.object({
  id: positionId,
  name: positionName,
});

export async function updatePosition(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");

  // Validation
  const input = Object.fromEntries(formData.entries());
  const result = schema.safeParse(input);

  if (!result.success) {
    return {
      status: "error",
      message: t("common.error.invalidData"),
    };
  }

  try {
    await updatePositionQuery(result.data);
  } catch {
    return {
      status: "error",
      message: t("position.update.error.internalServerError"),
    };
  }

  return {
    status: "success",
    message: t("position.update.success"),
  };
}
