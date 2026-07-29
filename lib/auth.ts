import prisma from "@/lib/prisma";
import { transporter } from "./mail";
import { i18n } from "@better-auth/i18n";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { ac, owner, member } from "./permissions";
import { translations } from "@/messages/better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { organization, testUtils } from "better-auth/plugins";

type EmailTemplateProps = {
  title: string;
  paragraphs: string[];
  buttonText: string;
  buttonUrl: string;
  buttonColor?: string;
  footer?: string;
};

function emailTemplate({
  title,
  paragraphs,
  buttonText,
  buttonUrl,
  buttonColor = "#111827",
  footer,
}: EmailTemplateProps) {
  return `
    <div style="margin:0;background:#f4f4f5;padding:40px 20px;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;padding:40px;box-sizing:border-box;text-align:center;">

        <h1 style="margin:0;font-size:28px;font-weight:700;color:#111827;">
          ${title}
        </h1>

        ${paragraphs
          .map(
            (paragraph, index) => `
              <p style="
                margin:${index === 0 ? "24px" : "16px"} 0 ${
                  index === paragraphs.length - 1 ? "32px" : "0"
                };
                font-size:16px;
                line-height:24px;
                color:#4b5563;
              ">
                ${paragraph}
              </p>
            `,
          )
          .join("")}

        <a
          href="${buttonUrl}"
          style="
            display:inline-block;
            padding:14px 28px;
            background:${buttonColor};
            border-radius:8px;
            color:#ffffff;
            text-decoration:none;
            font-size:16px;
            font-weight:600;
          "
        >
          ${buttonText}
        </a>

        ${
          footer
            ? `
          <p style="margin:32px 0 0;font-size:14px;line-height:22px;color:#9ca3af;">
            ${footer}
          </p>
        `
            : ""
        }

        <p style="margin:24px 0 0;font-size:14px;line-height:20px;word-break:break-all;">
          <a href="${buttonUrl}" style="color:#2563eb;text-decoration:none;">
            ${buttonUrl}
          </a>
        </p>

      </div>
    </div>
  `;
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      transporter.sendMail({
        from: `"Taskry" <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: "Подтверждение электронной почты",
        text: `Перейдите по ссылке для подтверждения email: ${url}`,
        html: emailTemplate({
          title: "Подтвердите ваш email",
          paragraphs: [
            `Здравствуйте, ${user.name ?? "пользователь"}!`,
            "Спасибо за регистрацию. Нажмите кнопку ниже, чтобы подтвердить адрес электронной почты.",
          ],
          buttonText: "Подтвердить email",
          buttonUrl: url,
        }),
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
        from: `"Taskry" <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: "Сброс пароля",
        text: `Перейдите по ссылке для сброса пароля: ${url}`,
        html: emailTemplate({
          title: "Сброс пароля",
          paragraphs: [
            "Мы получили запрос на сброс пароля для вашей учетной записи.",
            "Нажмите кнопку ниже, чтобы задать новый пароль.",
          ],
          buttonText: "Сбросить пароль",
          buttonUrl: url,
          buttonColor: "#dc2626",
          footer:
            "Если вы не запрашивали сброс пароля, просто проигнорируйте это письмо.",
        }),
      });
    },
  },

  plugins: [
    i18n({
      translations,
      defaultLocale: "ru",
      detection: ["cookie"],
      localeCookie: "NEXT_LOCALE",
    }),
    organization({
      ac,
      roles: {
        owner,
        member,
      },
      async sendInvitationEmail(data) {
        const domain = process.env.BETTER_AUTH_URL;
        const inviteLink = `${domain}/accept-invitation/${data.id}`;

        await transporter.sendMail({
          from: `"Taskry" <${process.env.SMTP_USER}>`,
          to: data.email,
          subject: `Приглашение в рабочее пространство`,
          text: `Вас пригласили присоединиться к рабочему пространству. Примите приглашение: ${inviteLink}`,
          html: emailTemplate({
            title: `Приглашение в рабочее пространство`,
            paragraphs: [
              `${data.inviter.user.name} (${data.inviter.user.email}) пригласил вас присоединиться к рабочему пространству.`,
            ],
            buttonText: "Принять приглашение",
            buttonUrl: inviteLink,
          }),
        });
      },
      organizationLimit: 1,
    }),
    ...(process.env.NODE_ENV === "test" ? [testUtils()] : []),
    nextCookies(),
  ],

  user: {
    fields: {
      name: "fullName",
    },

    additionalFields: {
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

  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const organization = await getOrganization(session.userId);

          return {
            data: {
              ...session,
              activeOrganizationId: organization?.id,
            },
          };
        },
      },
    },
  },
});

async function getOrganization(userId: string) {
  const organization = await prisma.organization.findFirst({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
  });

  return organization;
}
