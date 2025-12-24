"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { withAuthAction } from "../utils/withAuthAction";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { createCustomer as createCustomerQuery } from "@/lib/data/customer/customer.dal";

const schema = z.object({
  fullName: z.string().min(1).max(255),
  bio: z.string().max(5000).optional(),
  email: z.email().min(1).max(254),
  phoneNumber: z.string().min(1).max(255).optional(),
  publicLink: z.string().min(1).max(255).optional(),
  companyId: z.coerce.number().positive(),
});

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
    revalidatePath("/projects");

    return actionSuccess();
  });
}
