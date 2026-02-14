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
import { revalidatePath } from "next/cache";
import { companyId } from "@/lib/schemas/company";
import { getTranslations } from "next-intl/server";
import { emptyStringToNull } from "@/lib/schemas/base";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { updateCustomer as updateCustomerQuery } from "@/lib/data/customer/customer.dal";

const schema = z.object({
  id: customerId,
  fullName: customerFullName,
  bio: z.preprocess(emptyStringToNull, customerBio.nullable()),
  email: customerEmail,
  phoneNumber: z.preprocess(emptyStringToNull, customerPhoneNumber.nullable()),
  publicLink: z.preprocess(emptyStringToNull, customerPublicLink.nullable()),
  companyId: z.preprocess(emptyStringToNull, companyId.nullable()),
});

export async function updateCustomer(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);

    await updateCustomerQuery(parsedData);
    revalidatePath("/customers");

    return {
      status: "success",
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("updateCustomer.error.internalServerError"),
    };
  }
}
