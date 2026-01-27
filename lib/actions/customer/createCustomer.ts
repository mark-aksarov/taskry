"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { customerSchema } from "@/lib/schemas/customer";
import { withAuthAction } from "../utils/withAuthAction";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { createCustomer as createCustomerQuery } from "@/lib/data/customer/customer.dal";

const schema = customerSchema.omit({ id: true });

export async function createCustomer(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return withAuthAction(async () => {
    const t = await getTranslations("actions.common");

    const input = Object.fromEntries(formData.entries());
    const parsed = validateActionInput(schema, input);

    if (!parsed.success) {
      return actionError(t("validation.invalidInput"));
    }

    await createCustomerQuery(parsed.data);
    revalidatePath("/customers");

    return actionSuccess();
  });
}
