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
import { getTranslations } from "next-intl/server";
import { positionId } from "@/lib/schemas/position";
import { emptyStringToNull } from "@/lib/schemas/base";
import { updateUser as updateUserService } from "@/lib/data/user/user.service";
import { requireActionSession } from "@/lib/utils/requireActionSession";

const schema = z.object({
  id: userId,
  fullName: userFullName.optional(),
  bio: z.preprocess(emptyStringToNull, userBio.nullable()).optional(),
  address: z.preprocess(emptyStringToNull, userAddress.nullable()).optional(),
  birthdate: z
    .preprocess(emptyStringToNull, userBirthdate.nullable())
    .optional(),
  phoneNumber: z
    .preprocess(emptyStringToNull, userPhoneNumber.nullable())
    .optional(),
  publicLink: z
    .preprocess(emptyStringToNull, userPublicLink.nullable())
    .optional(),
  positionId: z.preprocess(emptyStringToNull, positionId.nullable()).optional(),
});

export async function updateUser(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);
    await updateUserService(parsedData);

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
      message: t("user.update.error.internalServerError"),
    };
  }
}
