import prisma from "@/lib/prisma";
import { transporter } from "./mail";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { admin as adminPlugin } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { ac, admin, owner, user, guest } from "@/lib/permissions";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      transporter.sendMail({
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
    minPasswordLength: 8,
    maxPasswordLength: 128,
    sendResetPassword: async ({ user, url }) => {
      transporter.sendMail({
        from: process.env.SMTP_USER,
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
  },
  plugins: [
    adminPlugin({
      ac,
      defaultRole: "owner",
      roles: {
        admin,
        owner,
        user,
        guest,
      },
    }),
    nextCookies(),
  ],
  user: {
    fields: {
      name: "fullName",
    },

    additionalFields: {
      workspaceId: {
        type: "number",
        input: true,
      },
      role: {
        type: "string",
        input: false,
      },
      positionId: {
        type: "number",
        input: false,
      },
      bio: {
        type: "string",
        input: false,
      },
      birthdate: {
        type: "date",
        input: false,
      },
      phoneNumber: {
        type: "string",
        input: false,
      },
      address: {
        type: "string",
        input: false,
      },
      publicLink: {
        type: "string",
        input: false,
      },
    },
  },
});
