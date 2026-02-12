"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { positionSchema } from "@/lib/schemas/position";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { createPosition as createPositionQuery } from "@/lib/data/position/position.dal";

const schema = positionSchema.omit({ id: true });

export async function createPosition(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  try {
    // Parse and validate form data
    const parsed = schema.safeParse({ name: formData.get("name") });

    if (!parsed.success) {
      console.error("Validation error", parsed.error);

      return {
        status: "error",
        errorCode: "validationError",
      };
    }

    // Create position
    await createPositionQuery(parsed.data);
    revalidatePath("/users");

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
