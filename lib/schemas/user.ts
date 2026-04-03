import z from "zod";

export const userId = z.string().trim().min(1).max(255);
export const userFullName = z.string().trim().min(1).max(255);
export const userBio = z.string().trim().min(1).max(5000);
export const userAddress = z.string().trim().min(1).max(255);
export const userBirthdate = z.iso.date();
export const userEmail = z.email({ pattern: z.regexes.html5Email }).max(254);
export const userPassword = z.string().min(8).max(128);
export const userPhoneNumber = z.string().trim().min(1).max(255);
export const userPublicLink = z.string().trim().min(1).max(255);
export const rememberMe = z.preprocess(
  (val) => (!val ? "false" : val),
  z.stringbool(),
);
export const userImageUrl = z.url();
