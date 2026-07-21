"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { companyName } from "@/lib/schemas/company";
import { COMPANY_MAX_COUNT } from "@/lib/data/constants";
import { LimitExceededError } from "@/lib/data/utils/error";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { createCompanies as createCompaniesQuery } from "@/lib/data/company/company.dal";

const schema = z.object({
  name: companyName,
});

export async function createCompany(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const parsedDate = schema.parse({
      name: formData.get("name"),
    });

    await createCompaniesQuery([parsedDate]);

    return {
      status: "success",
      message: t("company.create.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    if (error instanceof LimitExceededError) {
      return {
        status: "error",
        message: t("company.create.error.limitExceededError", {
          count: COMPANY_MAX_COUNT,
        }),
      };
    }

    return {
      status: "error",
      message: t("company.create.error.internalServerError"),
    };
  }
}
