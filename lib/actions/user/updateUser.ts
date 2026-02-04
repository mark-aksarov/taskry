"use server";

import { ActionState } from "../types";
import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";
import { userSchema } from "@/lib/schemas/user";
import { updateUser as updateUserService } from "@/lib/data/user/user.service";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = userSchema.omit({ email: true, password: true });

export async function updateUser(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  try {
    // Parse and validate form data
    const input = Object.fromEntries(formData.entries());
    const parsed = schema.safeParse(input);

    if (!parsed.success) {
      console.error("Validation error", parsed.error);

      return {
        status: "error",
        errorCode: "validationError",
      };
    }

    // Update customer
    await updateUserService(parsed.data);

    revalidatePath("/team");

    return {
      status: "success",
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    if (error instanceof APIError) {
      return {
        status: "error",
        errorCode: "authServiceError",
        message: error.message,
      };
    }

    return {
      status: "error",
      errorCode: "internalServerError",
    };
  }
}
