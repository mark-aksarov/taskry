"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { parseCsvFile } from "@/lib/utils/parseCsvFile";
import { CUSTOMER_MAX_COUNT } from "@/lib/data/constants";
import { LimitExceededError } from "@/lib/data/utils/error";
import { createCustomerSchema } from "@/lib/schemas/customer";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { createCustomers as createCustomersQuery } from "@/lib/data/customer/customer.dal";

const schema = z.array(createCustomerSchema.strict()).min(1);

export async function importCustomers(
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const file = formData.get("file");

    if (!(file instanceof File)) {
      throw new Error("File is required");
    }

    const parsedData = await parseCsvFile(file, schema);
    await createCustomersQuery(parsedData);

    return {
      status: "success",
      message: t("customer.import.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    if (error instanceof LimitExceededError) {
      return {
        status: "error",
        message: t("customer.import.error.limitExceededError", {
          count: CUSTOMER_MAX_COUNT,
        }),
      };
    }

    return {
      status: "error",
      message: t("customer.import.error.internalServerError"),
    };
  }
}
