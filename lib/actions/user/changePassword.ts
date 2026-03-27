"use server";

import z from "zod";
import { ActionState } from "../types";
import { APIError } from "better-auth";
import { getTranslations } from "next-intl/server";
import { userId, userPassword } from "@/lib/schemas/user";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { changePassword as changePasswordService } from "@/lib/data/user/user.service";
import { NotFoundError } from "@/lib/data/utils/error";

const schema = z
  .object({
    id: userId,
    password: userPassword,
  })
  .transform((o) => ({
    id: o.id,
    newPassword: o.password,
  }));

export async function changePassword(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);
    await changePasswordService(parsedData);

    return {
      status: "success",
      message: t("user.changePassword.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    if (error instanceof NotFoundError) {
      return {
        status: "error",
        errorCode: "notFound",
        message: t("user.common.error.notFound"),
      };
    }

    if (error instanceof APIError) {
      return {
        status: "error",
        message: t("common.error.authError", { message: error.message }),
      };
    }

    return {
      status: "error",
      message: t("user.changePassword.error.internalServerError"),
    };
  }
}
