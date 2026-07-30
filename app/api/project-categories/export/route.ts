import {
  unauthorized,
  internalServerError,
} from "@/lib/utils/routeHandlerErrors";

import Papa from "papaparse";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { exportProjectCategories } from "@/lib/data/projectCategory/projectCategory.dal";

export async function GET() {
  // Authorization
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return unauthorized();
  }

  try {
    const projectCategories = await exportProjectCategories();

    const csv = Papa.unparse(projectCategories);

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="projectCategories.csv"',
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return internalServerError();
  }
}
