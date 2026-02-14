import z from "zod";

export const booleanSearchParam = z.stringbool().optional().catch(undefined);

export const pageSearchParam = z.coerce.number().int().positive().catch(1);

export const pageSizeSearchParam = z.coerce
  .number()
  .int()
  .min(1)
  .max(100)
  .catch(20);

export const searchParamToArray = (val: unknown) => {
  if (typeof val === "string") return [val];
  if (Array.isArray(val)) return val;
  return undefined;
};

export const dateSearchParam = z.coerce
  .date("yyyy-MM-dd")
  .optional()
  .catch(undefined);

export const emptyStringToUndefined = (v: unknown) =>
  typeof v === "string" && v === "" ? undefined : v;

export const emptyStringToNull = (v: unknown) =>
  typeof v === "string" && v === "" ? null : v;
