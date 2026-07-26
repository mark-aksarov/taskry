"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { positionId } from "@/lib/schemas/position";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { deletePositions as deletePositionsQuery } from "@/lib/data/position/position.dal";

const positionIds = z.array(positionId).min(1);

export async function deletePositions(ids: number[]): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t(
    "position.deleteMany.error.internalServerError",
  );

  // Validation
  const result = positionIds.safeParse(ids);

  if (!result.success) {
    return {
      status: "error",
      // This ids does not come from a user form, so the user cannot fix invalid input
      message: internalServerError,
    };
  }

  // Delete positions
  try {
    await deletePositionsQuery(result.data);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  return {
    status: "success",
    message: t("position.deleteMany.success"),
  };
}
