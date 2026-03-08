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
import { NotFoundError } from "@/lib/data/utils/error";
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

    return {
      status: "success",
      message: t("customer.update.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    if (error instanceof NotFoundError) {
      if (error.code === "customerNotFound") {
        return {
          status: "error",
          errorCode: "notFound",
          message: t("customer.common.error.notFound"),
        };
      } else {
        return {
          status: "error",
          errorCode: "badRequest",
          message: t("customer.common.error.relationNotFound"),
        };
      }
    }

    return {
      status: "error",
      message: t("customer.update.error.internalServerError"),
    };
  }
}
