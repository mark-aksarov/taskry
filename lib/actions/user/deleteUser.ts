"use server";

import { ActionState } from "../types";
import { APIError } from "better-auth";
import { userId } from "@/lib/schemas/user";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { deleteUser as deleteUserService } from "@/lib/data/user/user.service";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

export async function deleteUser(
  _prevState: ActionState,
  id: string,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();
  const t = await getTranslations("actions");

  try {
    const parsedId = userId.parse(id);
    await deleteUserService(parsedId);
    revalidatePath("/team");

    return {
      status: "success",
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    if (error instanceof APIError) {
      return {
        status: "error",
        message: t("common.error.authError", { message: error.message }),
      };
    }

    return {
      status: "error",
      message: t("deleteUser.error.internalServerError"),
    };
  }
}
