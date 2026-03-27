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
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { NotFoundError } from "@/lib/data/utils/error";

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

export async function updateUser(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

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

    if (error instanceof NotFoundError) {
      if (error.code === "userNotFound") {
        return {
          status: "error",
          errorCode: "notFound",
          message: t("user.common.error.notFound"),
        };
      } else {
        return {
          status: "error",
          errorCode: "badRequest",
          message: t("user.common.error.relationNotFound"),
        };
      }
    }

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
