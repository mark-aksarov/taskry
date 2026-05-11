import { useTranslations } from "next-intl";
import { ProgressBar } from "@/ui/ProgressBar";
import { DetailInfoAlt, DetailTitle } from "./Detail";

interface ProgressDetailInfoAltProps {
  progress: number;
  "aria-label": string;
}

export function ProgressDetailInfoAlt({
  progress,
  "aria-label": ariaLabel,
}: ProgressDetailInfoAltProps) {
  const t = useTranslations("dashboard.common.ProgressDetailInfoAlt");

  return (
    <DetailInfoAlt
      title={<DetailTitle>{t("progress")}</DetailTitle>}
      content={
        <ProgressBar
          aria-label={ariaLabel}
          className="w-full"
          showValueText={false}
          value={progress}
        />
      }
      rightSlot={
        <div className="text-xs font-medium text-(--text-secondary)">
          {progress.toFixed(0)}%
        </div>
      }
    />
  );
}
