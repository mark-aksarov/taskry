import Papa from "papaparse";
import z from "zod";

export async function parseCsvFile<T>(file: File, schema: z.ZodSchema<T>) {
  if (
    file.size === 0 ||
    file.size > 512 * 1024 ||
    !file.name.toLowerCase().endsWith(".csv")
  ) {
    return {
      success: false,
      error: "Invalid CSV file",
    } as const;
  }

  const text = await file.text();

  const result = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
  });

  const data = schema.safeParse(result.data);

  return data;
}
