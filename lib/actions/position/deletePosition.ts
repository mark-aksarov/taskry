"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { positionId } from "@/lib/schemas/position";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { deletePositions as deletePositionsQuery } from "@/lib/data/position/position.dal";

export async function deletePosition(
  _prevState: ActionState,
  id: number,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedId = positionId.parse(id);
    await deletePositionsQuery([parsedId]);
    revalidatePath("/");

    return {
      status: "success",
      message: t("position.delete.success.one"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("position.delete.error.one"),
    };
  }
}
