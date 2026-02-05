"use server";

import { ActionState } from "../types";
import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";
import { userSchema } from "@/lib/schemas/user";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { changePassword as changePasswordService } from "@/lib/data/user/user.service";

const schema = userSchema.pick({ id: true, password: true }).transform((o) => ({
  id: o.id,
  newPassword: o.password,
}));

export async function changePassword(
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
    await changePasswordService(parsed.data);

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
