"use server";

import { ActionState } from "../types";
import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";
import { userSchema } from "@/lib/schemas/user";
import { createUser as createUserService } from "@/lib/data/user/user.service";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = userSchema.omit({ id: true }).pick({
  email: true,
  password: true,
  fullName: true,
});

export async function createUser(
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

    // Create user
    await createUserService(parsed.data);

    revalidatePath("/team");

    return {
      status: "success",
    };
  } catch (error: unknown) {
    console.error("Create User Error:", error);

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
