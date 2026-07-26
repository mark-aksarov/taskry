"use server";

import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { positionId } from "@/lib/schemas/position";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { deletePositions as deletePositionsQuery } from "@/lib/data/position/position.dal";

export async function deletePosition(id: number): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t("position.delete.error.internalServerError");

  // Validation
  const result = positionId.safeParse(id);

  if (!result.success) {
    return {
      status: "error",
      // This id does not come from a user form, so the user cannot fix invalid input
      message: internalServerError,
    };
  }

  // Delete position
  try {
    await deletePositionsQuery([result.data]);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  return {
    status: "success",
    message: t("position.delete.success"),
  };
}
