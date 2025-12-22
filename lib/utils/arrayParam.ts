import z from "zod";

export const arrayParam = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.preprocess((val) => {
    if (typeof val === "string") {
      return val.split(",").filter(Boolean);
    }

    if (Array.isArray(val)) {
      return val.flatMap((v) => (typeof v === "string" ? v.split(",") : []));
    }

    return [];
  }, z.array(itemSchema));
