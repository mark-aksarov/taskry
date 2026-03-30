"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { NotFoundError } from "@/lib/data/utils/error";
import { positionId, positionName } from "@/lib/schemas/position";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { updatePosition as updatePositionQuery } from "@/lib/data/position/position.dal";

const schema = z.object({
  id: positionId,
  name: positionName,
});

export async function updatePosition(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

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

    if (error instanceof NotFoundError) {
      return {
        status: "error",
        errorCode: "notFound",
        message: t("position.common.error.notFound"),
      };
    }

    return {
      status: "error",
      message: t("position.update.error.internalServerError"),
    };
  }
}
