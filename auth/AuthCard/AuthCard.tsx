import { tv } from "tailwind-variants";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Card } from "@/dashboard/common/Card";
import { AuthLangMenuTrigger } from "../AuthLangMenuTrigger";

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
        <Link className="text-sm font-bold text-black dark:text-white" href="/">
          {t("homeLabel")}
        </Link>
        <AuthLangMenuTrigger />
      </div>

      {children}
    </Card>
  );
}
