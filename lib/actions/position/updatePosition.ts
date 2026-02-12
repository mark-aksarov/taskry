"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { positionSchema } from "@/lib/schemas/position";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { updatePosition as updatePositionQuery } from "@/lib/data/position/position.dal";

export async function updatePosition(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  try {
    // Parse and validate form data
    const input = Object.fromEntries(formData.entries());
    const parsed = positionSchema.safeParse(input);

    if (!parsed.success) {
      console.error("Validation error", parsed.error);

      return {
        status: "error",
        errorCode: "validationError",
      };
    }

    // Create position
    await updatePositionQuery(parsed.data);
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
