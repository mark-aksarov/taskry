"use server";

import z from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "@/i18n/navigation";
import { customerId } from "@/lib/schemas/customer";
import { getLocale, getTranslations } from "next-intl/server";
import { ActionState, DeleteCustomersPayload } from "../types";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { deleteCustomers as deleteCustomersQuery } from "@/lib/data/customer/customer.dal";

const customerIds = z.array(customerId).min(1);

export async function deleteCustomers(
  _prevState: ActionState,
  payload: DeleteCustomersPayload,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  let parsedIds: number[] = [];

  try {
    parsedIds = customerIds.parse(payload.ids);

    await deleteCustomersQuery(parsedIds);
    revalidatePath("/customers");
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message:
        parsedIds.length > 1
          ? t("customer.delete.error.many")
          : t("customer.delete.error.one"),
    };
  }

  const locale = await getLocale();

  if (payload.shouldRedirect) {
    redirect({ href: "/customers", locale });
  }

  return {
    status: "success",
    message:
      parsedIds.length > 1
        ? t("customer.delete.success.many")
        : t("customer.delete.success.one"),
  };
}
