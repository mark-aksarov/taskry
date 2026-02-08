import z from "zod";

export const booleanSearchParam = z.stringbool().optional().catch(undefined);

export const pageSearchParam = z.coerce.number().int().positive().catch(1);

export const pageSizeSearchParam = z.coerce
  .number()
  .int()
  .min(1)
  .max(100)
  .catch(20);

export const arraySearchParam = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.preprocess((val) => {
    if (typeof val === "string") {
      return [val];
    }

    if (Array.isArray(val)) {
      return val;
    }

    return undefined;
  }, z.array(itemSchema).optional().catch(undefined));

export const dateSearchParam = z.coerce
  .date("yyyy-MM-dd")
  .optional()
  .catch(undefined);

export const coercedPositiveInt = z.preprocess((val) => {
  if (typeof val === "string") {
    return Number.parseInt(val);
  }
  return val;
}, z.int().positive());

export const emptyStringToUndefined = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? undefined : v;
