"use server";

import {
  userId,
  userBio,
  userAddress,
  userFullName,
  userBirthdate,
  userPublicLink,
  userPhoneNumber,
} from "@/lib/schemas/user";

import z from "zod";
import { ActionState } from "../types";
import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { positionId } from "@/lib/schemas/position";
import { emptyStringToNull } from "@/lib/schemas/base";
import { updateUser as updateUserService } from "@/lib/data/user/user.service";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = z.object({
  id: userId,
  fullName: userFullName,
  bio: z.preprocess(emptyStringToNull, userBio.nullable()),
  address: z.preprocess(emptyStringToNull, userAddress.nullable()),
  birthdate: z.preprocess(emptyStringToNull, userBirthdate.nullable()),
  phoneNumber: z.preprocess(emptyStringToNull, userPhoneNumber.nullable()),
  publicLink: z.preprocess(emptyStringToNull, userPublicLink.nullable()),
  positionId: z.preprocess(emptyStringToNull, positionId.nullable()),
});

export async function updateUser(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);
    await updateUserService(parsedData);
    revalidatePath("/");

    return {
      status: "success",
      message: t("user.update.success"),
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
      message: t("user.update.error"),
    };
  }
}
