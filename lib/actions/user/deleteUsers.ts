"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { actionError, actionSuccess } from "../utils/actionResult";
import { deleteUsers as deleteUsersQuery } from "@/lib/data/user/user.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = z.object({
  ids: z.array(z.string()).min(1),
});

export async function deleteUsers(
  _prevState: ActionState,
  ids: string[],
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions.common");

  try {
    // Parse and validate form data
    const parsed = schema.safeParse({ ids });

    if (!parsed.success) {
      console.error("Validation error", parsed.error);
      return actionError(t("validation.invalidInput"));
    }

    await deleteUsersQuery(parsed.data.ids);
    revalidatePath("/users");

    return actionSuccess();
  } catch (error) {
    console.error("Server Action Error:", error);
    return actionError(t("validation.internalServerError"));
  }
}
