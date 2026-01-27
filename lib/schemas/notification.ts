import z from "zod";

export const FilterEnumParam = z.enum(["all", "unread"]);
