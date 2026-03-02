"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { positionId } from "@/lib/schemas/position";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { deletePositions as deletePositionsQuery } from "@/lib/data/position/position.dal";

const positionIds = z.array(positionId).min(1);

export async function deletePositions(
  _prevState: ActionState,
  ids: number[],
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  let parsedIds: number[] = [];

  try {
    parsedIds = positionIds.parse(ids);
    await deletePositionsQuery(parsedIds);

    revalidatePath("/positions");

    return {
      status: "success",
      message:
        parsedIds.length > 1
          ? t("position.delete.success.many")
          : t("position.delete.success.one"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message:
        parsedIds.length > 1
          ? t("position.delete.error.many")
          : t("position.delete.error.one"),
    };
  }
}
