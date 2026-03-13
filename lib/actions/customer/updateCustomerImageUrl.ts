"use server";

import z from "zod";
import { getTranslations } from "next-intl/server";
import { NotFoundError } from "@/lib/data/utils/error";
import { ActionState, UpdateCustomerImageUrlPayload } from "../types";
import { customerId, customerImageUrl } from "@/lib/schemas/customer";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { updateCustomerImageUrl as updateCustomerImageUrlQuery } from "@/lib/data/customer/customer.dal";

const schema = z.object({
  id: customerId,
  imageUrl: customerImageUrl,
});

export async function updateCustomerImageUrl(
  _prevState: ActionState,
  payload: UpdateCustomerImageUrlPayload,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const parsedData = schema.parse(payload);

    await updateCustomerImageUrlQuery(parsedData);

    return {
      status: "success",
      message: t("customer.updateImageUrl.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    if (error instanceof NotFoundError) {
      return {
        status: "error",
        errorCode: "notFound",
        message: t("customer.common.error.notFound"),
      };
    }

    return {
      status: "error",
      message: t("customer.updateImageUrl.error.internalServerError"),
    };
  }
}
