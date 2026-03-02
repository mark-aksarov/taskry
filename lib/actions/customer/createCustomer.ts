"use server";

import {
  customerBio,
  customerEmail,
  customerFullName,
  customerPublicLink,
  customerPhoneNumber,
} from "@/lib/schemas/customer";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { companyId } from "@/lib/schemas/company";
import { getTranslations } from "next-intl/server";
import { emptyStringToUndefined } from "@/lib/schemas/base";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { createCustomer as createCustomerQuery } from "@/lib/data/customer/customer.dal";

const schema = z.object({
  fullName: customerFullName,
  bio: z.preprocess(emptyStringToUndefined, customerBio.optional()),
  email: customerEmail,
  phoneNumber: z.preprocess(
    emptyStringToUndefined,
    customerPhoneNumber.optional(),
  ),
  publicLink: z.preprocess(
    emptyStringToUndefined,
    customerPublicLink.optional(),
  ),
  companyId: z.preprocess(emptyStringToUndefined, companyId.optional()),
});

export async function createCustomer(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);

    await createCustomerQuery(parsedData);
    revalidatePath("/customers");

    return {
      status: "success",
      message: t("customer.create.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("customer.create.error"),
    };
  }
}
