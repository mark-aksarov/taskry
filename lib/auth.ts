import prisma from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { redirect } from "next/navigation";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { transporter } from "./mail";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },

    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
  },
  signUp: {
    onSuccess: async () => {
      redirect("/");
    },
  },
  signIn: {
    onSuccess: async () => {
      redirect("/");
    },
  },
});
