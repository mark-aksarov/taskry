import { tv } from "tailwind-variants";
import { AuthLink } from "../AuthLink";
import { Card } from "@/dashboard/common/Card";
import { AuthLangMenuTrigger } from "../AuthLangMenuTrigger";
import { useTranslations } from "next-intl";

interface AuthCardProps {
  "data-test"?: string;
  children: React.ReactNode;
}

const styles = tv({
  slots: {
    base: [
      "flex flex-col",
      "p-6",
      "max-md:min-h-full",
      "max-md:w-full",
      "max-md:rounded-none",
      "max-md:shadow-none",
      "md:w-[460px]",
      "md:rounded-xl",
    ],

    header: "mb-10 flex items-center justify-between",
    backButton: "rounded-full",
  },
});

export function AuthCard({ "data-test": dataTest, children }: AuthCardProps) {
  const t = useTranslations("auth.AuthCard");

  const s = styles();

  return (
    <Card data-test={dataTest} className={s.base()}>
      <div className={s.header()}>
        <AuthLink href="/">{t("homeLabel")}</AuthLink>
        <AuthLangMenuTrigger />
      </div>

      {children}
    </Card>
  );
}
