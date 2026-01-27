"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { customerSchema } from "@/lib/schemas/customer";
import { withAuthAction } from "../utils/withAuthAction";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { updateCustomer as updateCustomerQuery } from "@/lib/data/customer/customer.dal";

export async function updateCustomer(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return withAuthAction(async () => {
    const t = await getTranslations("actions.common");

    const input = Object.fromEntries(formData.entries());
    const parsed = validateActionInput(customerSchema, input);

    if (!parsed.success) {
      return actionError(t("validation.invalidInput"));
    }

    await updateCustomerQuery(parsed.data);
    revalidatePath("/customers");

    return actionSuccess();
  });
}
