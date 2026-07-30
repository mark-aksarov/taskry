import {
  unauthorized,
  internalServerError,
} from "@/lib/utils/routeHandlerErrors";

import Papa from "papaparse";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { exportProjects } from "@/lib/data/project/project.dal";

export async function GET() {
  // Authorization
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return unauthorized();
  }

  try {
    const clients = await exportProjects();

    const csv = Papa.unparse(clients);

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="projects.csv"',
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return internalServerError();
  }
}
