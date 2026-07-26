"use server";

import {
  clientId,
  clientBio,
  clientEmail,
  clientFullName,
  clientPhoneNumber,
  clientPublicLink,
} from "@/lib/schemas/client";

import z from "zod";
import { ActionState } from "../types";
import { companyId } from "@/lib/schemas/company";
import { getTranslations } from "next-intl/server";
import { emptyStringToNull } from "@/lib/schemas/base";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { updateClient as updateClientQuery } from "@/lib/data/client/client.dal";

const schema = z.object({
  id: clientId,
  fullName: clientFullName.optional(),
  bio: z.preprocess(emptyStringToNull, clientBio.nullable()).optional(),
  email: clientEmail.optional(),
  phoneNumber: z
    .preprocess(emptyStringToNull, clientPhoneNumber.nullable())
    .optional(),
  publicLink: z
    .preprocess(emptyStringToNull, clientPublicLink.nullable())
    .optional(),
  companyId: z.preprocess(emptyStringToNull, companyId.nullable()).optional(),
});

export async function updateClient(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");

  // Validation
  const input = Object.fromEntries(formData.entries());
  const result = schema.safeParse(input);

  if (!result.success) {
    return {
      status: "error",
      message: t("common.error.invalidData"),
    };
  }

  // Update client
  try {
    await updateClientQuery(result.data);
  } catch {
    return {
      status: "error",
      message: t("client.update.error.internalServerError"),
    };
  }

  return {
    status: "success",
    message: t("client.update.success"),
  };
}
