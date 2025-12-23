import z from "zod";

export function validateActionInput<T>(
  schema: z.Schema<T>,
  input: unknown,
): { success: true; data: T } | { success: false } {
  const result = schema.safeParse(input);

  if (!result.success) {
    console.error("Validation error", result.error);
    return { success: false };
  }

  return { success: true, data: result.data };
}
