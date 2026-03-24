"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { customerId } from "@/lib/schemas/customer";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { deleteCustomers as deleteCustomersQuery } from "@/lib/data/customer/customer.dal";

const customerIds = z.array(customerId).min(1);

export async function deleteCustomers(ids: number[]): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedIds = customerIds.parse(ids);

    await deleteCustomersQuery(parsedIds);

    return {
      status: "success",
      message: t("customer.deleteMany.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("customer.deleteMany.error.internalServerError"),
    };
  }
}
