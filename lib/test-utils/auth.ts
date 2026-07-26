import { vi } from "vitest";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "../prisma";

export async function loginAs(userId: string) {
  const ctx = await auth.$context;
  const test = ctx.test;

  const result = await test.login({ userId });

  vi.mocked(headers).mockResolvedValue(result.headers);

  return result;
}

export async function setupAuth(userId?: string) {
  if (userId) {
    await loginAs(userId);
    return;
  }

  await prisma.session.deleteMany();
}
