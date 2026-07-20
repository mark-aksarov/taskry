"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { companyName } from "@/lib/schemas/company";
import { parseCsvFile } from "@/lib/utils/parseCsvFile";
import { COMPANY_MAX_COUNT } from "@/lib/data/constants";
import { LimitExceededError } from "@/lib/data/utils/error";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { createCompanies as createCompanyQueries } from "@/lib/data/company/company.dal";

const schema = z.array(z.object({ name: companyName }).strict()).min(1);

export async function importCompanies(
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const file = formData.get("file");

    if (!(file instanceof File)) {
      throw new Error("File is required");
    }

    const parsedData = await parseCsvFile(file, schema);
    await createCompanyQueries(parsedData);

    return {
      status: "success",
      message: t("company.import.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    if (error instanceof LimitExceededError) {
      return {
        status: "error",
        message: t("company.import.error.limitExceededError", {
          count: COMPANY_MAX_COUNT,
        }),
      };
    }

    return {
      status: "error",
      message: t("company.import.error.internalServerError"),
    };
  }
}
