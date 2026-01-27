"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { coercedPositiveInt } from "@/lib/schemas/base";
import { withAuthAction } from "../utils/withAuthAction";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { deleteCustomers as deleteCustomersQuery } from "@/lib/data/customer/customer.dal";

const schema = z.object({
  ids: z.array(coercedPositiveInt).min(1),
});

export async function deleteCustomers(
  _prevState: ActionState,
  ids: number[],
): Promise<ActionState> {
  return withAuthAction(async () => {
    const t = await getTranslations("actions.common");

    const parsed = validateActionInput(schema, { ids });

    if (!parsed.success) {
      return actionError(t("validation.invalidInput"));
    }

    await deleteCustomersQuery(parsed.data.ids);
    revalidatePath("/customers");

    return actionSuccess();
  });
}
