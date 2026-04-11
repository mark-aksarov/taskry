"use server";

import {
  customerId,
  customerBio,
  customerEmail,
  customerFullName,
  customerPhoneNumber,
  customerPublicLink,
} from "@/lib/schemas/customer";

import z from "zod";
import { ActionState } from "../types";
import { companyId } from "@/lib/schemas/company";
import { getTranslations } from "next-intl/server";
import { emptyStringToNull } from "@/lib/schemas/base";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { updateCustomer as updateCustomerQuery } from "@/lib/data/customer/customer.dal";

const schema = z.object({
  id: customerId,
  fullName: customerFullName.optional(),
  bio: z.preprocess(emptyStringToNull, customerBio.nullable()).optional(),
  email: customerEmail.optional(),
  phoneNumber: z
    .preprocess(emptyStringToNull, customerPhoneNumber.nullable())
    .optional(),
  publicLink: z
    .preprocess(emptyStringToNull, customerPublicLink.nullable())
    .optional(),
  companyId: z.preprocess(emptyStringToNull, companyId.nullable()).optional(),
});

export async function updateCustomer(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);

    await updateCustomerQuery(parsedData);

    return {
      status: "success",
      message: t("customer.update.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("customer.update.error.internalServerError"),
    };
  }
}
