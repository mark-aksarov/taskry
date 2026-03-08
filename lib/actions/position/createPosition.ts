"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { positionName } from "@/lib/schemas/position";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { createPosition as createPositionQuery } from "@/lib/data/position/position.dal";

const schema = z.object({
  name: positionName,
});

export async function createPosition(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const data = schema.parse({ name: formData.get("name") });
    await createPositionQuery(data);

    return {
      status: "success",
      message: t("position.create.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("position.create.error.internalServerError"),
    };
  }
}
