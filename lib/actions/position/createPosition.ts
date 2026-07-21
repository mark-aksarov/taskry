"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { positionName } from "@/lib/schemas/position";
import { POSITION_MAX_COUNT } from "@/lib/data/constants";
import { LimitExceededError } from "@/lib/data/utils/error";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { createPositions as createPositionsQuery } from "@/lib/data/position/position.dal";

const schema = z.object({
  name: positionName,
});

export async function createPosition(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const data = schema.parse({ name: formData.get("name") });
    await createPositionsQuery([data]);

    return {
      status: "success",
      message: t("position.create.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

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
}
