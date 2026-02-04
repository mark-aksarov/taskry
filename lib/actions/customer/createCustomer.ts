"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { customerSchema } from "@/lib/schemas/customer";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { createCustomer as createCustomerQuery } from "@/lib/data/customer/customer.dal";

const schema = customerSchema.omit({ id: true });

export async function createCustomer(
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

    // Create customer
    await createCustomerQuery(parsed.data);
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
