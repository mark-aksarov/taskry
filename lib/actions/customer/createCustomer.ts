"use server";

import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { createCustomerSchema } from "@/lib/schemas/customer";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { createCustomers as createCustomersQuery } from "@/lib/data/customer/customer.dal";

export async function createCustomer(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = createCustomerSchema.parse(input);

    await createCustomersQuery([parsedData]);

    return {
      status: "success",
      message: t("customer.create.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("customer.create.error.internalServerError"),
    };
  }
}
