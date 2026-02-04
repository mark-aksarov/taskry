"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { customerSchema } from "@/lib/schemas/customer";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { updateCustomer as updateCustomerQuery } from "@/lib/data/customer/customer.dal";

export async function updateCustomer(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  try {
    // Parse and validate form data
    const input = Object.fromEntries(formData.entries());
    const parsed = customerSchema.safeParse(input);

    if (!parsed.success) {
      console.error("Validation error", parsed.error);

      return {
        status: "error",
        errorCode: "validationError",
      };
    }

    // Update customer
    await updateCustomerQuery(parsed.data);
    revalidatePath("/customers");

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
