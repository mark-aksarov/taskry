import { useTranslations } from "next-intl";
import { ProgressBar } from "@/ui/ProgressBar";
import { DetailInfoAlt, DetailTitle } from "./Detail";

export function ProgressDetailInfoAlt({ progress }: { progress: number }) {
  const t = useTranslations("dashboard.common.ProgressDetailInfoAlt");

  return (
    <DetailInfoAlt
      title={<DetailTitle>{t("progress")}</DetailTitle>}
      content={
        <ProgressBar
          className="w-full"
          showValueText={false}
          value={progress}
        />
      }
      rightSlot={
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {progress.toFixed(0)}%
        </div>
      }
    />
  );
}
