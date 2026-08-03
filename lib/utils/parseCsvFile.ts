import z from "zod";
import Papa from "papaparse";

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

  try {
    const text = await file.text();

    const result = Papa.parse<Record<string, string>>(text, {
      header: true,
      skipEmptyLines: true,
      transform: (value) => value.trim(),
    });

    const rows = result.data
      .map((row) => {
        const cleaned = Object.fromEntries(
          Object.entries(row).filter(([key]) => key.trim() !== ""),
        );

        return cleaned;
      })
      .filter((row) => Object.values(row).some((value) => value.trim() !== ""));

    return schema.safeParse(rows);
  } catch {
    return {
      success: false,
      error: "Failed to read CSV file",
    } as const;
  }
}
