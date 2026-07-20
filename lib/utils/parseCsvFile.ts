import Papa from "papaparse";
import z from "zod";

export async function parseCsvFile<T>(
  file: File,
  schema: z.ZodSchema<T>,
): Promise<T> {
  if (
    file.size === 0 ||
    file.size > 512 * 1024 ||
    !file.name.toLowerCase().endsWith(".csv")
  ) {
    throw new Error("Invalid CSV file");
  }

  const text = await file.text();

  const result = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
  });

  const data = schema.parse(result.data);

  return data;
}
