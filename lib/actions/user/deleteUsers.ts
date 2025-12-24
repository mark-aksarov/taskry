"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { withAuthAction } from "../utils/withAuthAction";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { deleteUsers as deleteUsersQuery } from "@/lib/data/user/user.dal";

const schema = z.object({
  ids: z.array(z.string()).min(1),
});

export async function deleteUsers(
  _prevState: ActionState,
  ids: string[],
): Promise<ActionState> {
  return withAuthAction(async () => {
    const t = await getTranslations("actions.common");

    const parsed = validateActionInput(schema, { ids });

    if (!parsed.success) {
      return actionError(t("validation.invalidInput"));
    }

    await deleteUsersQuery(parsed.data.ids);
    revalidatePath("/users");

    return actionSuccess();
  });
}
