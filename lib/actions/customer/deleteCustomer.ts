"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "@/i18n/navigation";
import { customerId } from "@/lib/schemas/customer";
import { getLocale, getTranslations } from "next-intl/server";
import { ActionState, DeleteCustomerPayload } from "../types";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { deleteCustomers as deleteCustomersQuery } from "@/lib/data/customer/customer.dal";

export async function deleteCustomer(
  _prevState: ActionState,
  payload: DeleteCustomerPayload,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedId = customerId.parse(payload.id);

    await deleteCustomersQuery([parsedId]);
    revalidatePath("/");
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("customer.delete.error.one"),
    };
  }

  const locale = await getLocale();

  if (payload.shouldRedirect) {
    redirect({ href: "/customers", locale });
  }

  return {
    status: "success",
    message: t("customer.delete.success.one"),
  };
}
