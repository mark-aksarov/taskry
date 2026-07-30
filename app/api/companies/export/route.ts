import {
  unauthorized,
  internalServerError,
} from "@/lib/utils/routeHandlerErrors";

import Papa from "papaparse";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { exportCompanies } from "@/lib/data/company/company.dal";

export async function GET() {
  // Authorization
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return unauthorized();
  }

  try {
    const companies = await exportCompanies();

    const csv = Papa.unparse(companies);

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="companies.csv"',
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return internalServerError();
  }
}
