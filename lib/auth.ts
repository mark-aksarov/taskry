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
      await transporter.sendMail({
        from: `"Taskry" <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: "Подтверждение электронной почты",
        text: `Перейдите по ссылке для подтверждения email: ${url}`,
        html: `
        <div style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
            <tr>
              <td align="center">
                <table
                  width="600"
                  cellpadding="0"
                  cellspacing="0"
                  style="background:#ffffff;border-radius:12px;padding:40px;"
                >
                  <tr>
                    <td align="center">
                      <h1 style="margin:0;font-size:28px;color:#111827;">
                        Подтвердите ваш email
                      </h1>

                      <p style="margin:24px 0 0;color:#4b5563;font-size:16px;line-height:24px;">
                        Здравствуйте, ${user.name ?? "пользователь"}!
                      </p>

                      <p style="margin:16px 0 32px;color:#4b5563;font-size:16px;line-height:24px;">
                        Спасибо за регистрацию. Нажмите кнопку ниже,
                        чтобы подтвердить адрес электронной почты.
                      </p>

                      <a
                        href="${url}"
                        style="
                          display:inline-block;
                          background:#111827;
                          color:#ffffff;
                          text-decoration:none;
                          padding:14px 28px;
                          border-radius:8px;
                          font-size:16px;
                          font-weight:600;
                        "
                      >
                        Подтвердить email
                      </a>

                      <p style="margin:32px 0 0;color:#9ca3af;font-size:14px;line-height:22px;">
                        Если кнопка не работает, откройте ссылку вручную:
                      </p>

                      <p style="margin:12px 0 0;word-break:break-all;">
                        <a
                          href="${url}"
                          style="color:#2563eb;font-size:14px;text-decoration:none;"
                        >
                          ${url}
                        </a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      `,
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
      const parsedUrl = new URL(url);
      const callbackURL = parsedUrl.searchParams.get("callbackURL");

      const isInvite = callbackURL?.includes("/accept-invite");

      if (isInvite) {
        await transporter.sendMail({
          from: `"Taskry" <${process.env.SMTP_USER}>`,
          to: user.email,
          subject: "Приглашение в систему",
          text: `Вас пригласили в систему: ${url}`,
          html: `
          <div style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;padding:40px;">
                    <tr>
                      <td align="center">

                        <h1 style="margin:0;font-size:28px;color:#111827;">
                          Приглашение в систему
                        </h1>

                        <p style="margin:24px 0 0;color:#4b5563;font-size:16px;line-height:24px;">
                          Вас пригласили присоединиться к платформе.
                        </p>

                        <p style="margin:16px 0 32px;color:#4b5563;font-size:16px;line-height:24px;">
                          Нажмите кнопку ниже, чтобы принять приглашение.
                        </p>

                        <a href="${url}"
                          style="
                            display:inline-block;
                            background:#111827;
                            color:#fff;
                            text-decoration:none;
                            padding:14px 28px;
                            border-radius:8px;
                            font-size:16px;
                            font-weight:600;
                          ">
                          Принять приглашение
                        </a>

                        <p style="margin:32px 0 0;color:#9ca3af;font-size:14px;line-height:22px;">
                          Если вы не ожидали это письмо — просто проигнорируйте его.
                        </p>

                        <p style="margin:12px 0 0;word-break:break-all;">
                          <a href="${url}" style="color:#2563eb;font-size:14px;">
                            ${url}
                          </a>
                        </p>

                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        `,
        });

        return;
      }

      await transporter.sendMail({
        from: `"Taskry" <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: "Сброс пароля",
        text: `Перейдите по ссылке для сброса пароля: ${url}`,
        html: `
        <div style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;padding:40px;">
                  <tr>
                    <td align="center">

                      <h1 style="margin:0;font-size:28px;color:#111827;">
                        Сброс пароля
                      </h1>

                      <p style="margin:24px 0 0;color:#4b5563;font-size:16px;line-height:24px;">
                        Мы получили запрос на сброс пароля.
                      </p>

                      <p style="margin:16px 0 32px;color:#4b5563;font-size:16px;line-height:24px;">
                        Нажмите кнопку ниже, чтобы создать новый пароль.
                      </p>

                      <a href="${url}"
                        style="
                          display:inline-block;
                          background:#dc2626;
                          color:#fff;
                          text-decoration:none;
                          padding:14px 28px;
                          border-radius:8px;
                          font-size:16px;
                          font-weight:600;
                        ">
                        Сбросить пароль
                      </a>

                      <p style="margin:32px 0 0;color:#9ca3af;font-size:14px;">
                        Если вы не запрашивали сброс — игнорируйте это письмо.
                      </p>

                      <p style="margin:12px 0 0;word-break:break-all;">
                        <a href="${url}" style="color:#2563eb;font-size:14px;">
                          ${url}
                        </a>
                      </p>

                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      `,
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
      imageUrl: {
        type: "string",
        input: false,
      },
    },
  },
});
