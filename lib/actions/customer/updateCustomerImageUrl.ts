"use server";

import z from "zod";
import { getTranslations } from "next-intl/server";
import { ActionState, UpdateCustomerImageUrlPayload } from "../types";
import { customerId, customerImageUrl } from "@/lib/schemas/customer";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { updateCustomerImageUrl as updateCustomerImageUrlQuery } from "@/lib/data/customer/customer.dal";

const schema = z.object({
  id: customerId,
  imageUrl: customerImageUrl.nullable(),
});

export async function updateCustomerImageUrl(
  payload: UpdateCustomerImageUrlPayload,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedData = schema.parse(payload);

    await updateCustomerImageUrlQuery(parsedData);

    return {
      status: "success",
      message: t("customer.updateImageUrl.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("customer.updateImageUrl.error.internalServerError"),
    };
  }
}
