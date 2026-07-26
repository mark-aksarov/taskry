"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { positionName } from "@/lib/schemas/position";
import { POSITION_MAX_COUNT } from "@/lib/data/constants";
import { LimitExceededError } from "@/lib/data/utils/error";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { createPositions as createPositionsQuery } from "@/lib/data/position/position.dal";

const schema = z.object({
  name: positionName,
});

export async function createPosition(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");

  // Validation
  const result = schema.safeParse({ name: formData.get("name") });

  if (!result.success) {
    return {
      status: "error",
      message: t("common.error.invalidData"),
    };
  }

  // Create position
  try {
    await createPositionsQuery([result.data]);
  } catch (error) {
    if (error instanceof LimitExceededError) {
      return {
        status: "error",
        message: t("position.create.error.limitExceededError", {
          count: POSITION_MAX_COUNT,
        }),
      };
    }

    return {
      status: "error",
      message: t("position.create.error.internalServerError"),
    };
  }

  return {
    status: "success",
    message: t("position.create.success"),
  };
}
