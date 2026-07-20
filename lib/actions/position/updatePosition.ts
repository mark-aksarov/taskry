"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { positionId, positionName } from "@/lib/schemas/position";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { updatePosition as updatePositionQuery } from "@/lib/data/position/position.dal";

const schema = z.object({
  id: positionId,
  name: positionName,
});

export async function updatePosition(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const data = schema.parse(input);

    await updatePositionQuery(data);

    return {
      status: "success",
      message: t("position.update.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("position.update.error.internalServerError"),
    };
  }
}
