"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { positionId } from "@/lib/schemas/position";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { deletePositions as deletePositionsQuery } from "@/lib/data/position/position.dal";

const positionIds = z.array(positionId).min(1);

export async function deletePositions(ids: number[]): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedIds = positionIds.parse(ids);
    await deletePositionsQuery(parsedIds);

    return {
      status: "success",
      message: t("position.deleteMany.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("position.deleteMany.error.internalServerError"),
    };
  }
}
