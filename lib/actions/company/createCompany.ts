"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { companySchema } from "@/lib/schemas/company";
import { createCompany as createCompanyQuery } from "@/lib/data/company/company.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

export async function createCompany(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  try {
    // Parse and validate form data
    const parsed = companySchema.safeParse({
      name: formData.get("name"),
    });

    if (!parsed.success) {
      console.error("Validation error", parsed.error);

      return {
        status: "error",
        errorCode: "validationError",
      };
    }

    // Create company
    await createCompanyQuery(parsed.data);
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
