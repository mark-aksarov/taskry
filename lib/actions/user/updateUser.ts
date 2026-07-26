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
import { getTranslations } from "next-intl/server";
import { positionId } from "@/lib/schemas/position";
import { emptyStringToNull } from "@/lib/schemas/base";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { updateUser as updateUserQuery } from "@/lib/data/user/user.dal";

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
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t("user.update.error.internalServerError");

  // Validation
  const input = Object.fromEntries(formData.entries());
  const result = schema.safeParse(input);

  if (!result.success) {
    return {
      status: "error",
      message: t("user.update.error.invalidData"),
    };
  }

  // Update user in database
  try {
    await updateUserQuery(result.data);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  // Success
  return {
    status: "success",
    message: t("user.update.success"),
  };
}
