"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { coercedPositiveInt } from "@/lib/schemas/base";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { deletePositions as deletePositionsQuery } from "@/lib/data/position/position.dal";

const schema = z.object({
  ids: z.array(coercedPositiveInt).min(1),
});

export async function deletePositions(
  _prevState: ActionState,
  ids: number[],
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  try {
    // Parse and validate form data
    const parsed = schema.safeParse({ ids });

    if (!parsed.success) {
      console.error("Validation error", parsed.error);

      return {
        status: "error",
        errorCode: "validationError",
      };
    }

    // Delete positions
    await deletePositionsQuery(parsed.data.ids);
    revalidatePath("/positions");

    return {
      status: "success",
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      errorCode: "internalServerError",
    };
  }
}
