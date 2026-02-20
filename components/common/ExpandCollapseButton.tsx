import { linkStyles } from "../ui/Link";
import { useTranslations } from "next-intl";
import { Button } from "react-aria-components";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandCollapseButtonProps {
  isExpanded: boolean | null;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export function ExpandCollapseButton({
  isExpanded,
  setIsExpanded,
}: ExpandCollapseButtonProps) {
  const t = useTranslations("common.ExpandCollapseButton");

  if (isExpanded === null) return null;

  const Icon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <Button
      onPress={() => setIsExpanded(!isExpanded)}
      className={linkStyles({ variant: "primary", className: "mt-3 text-sm" })}
    >
      {isExpanded ? t("collapse") : t("expand")}
      <Icon size={16} absoluteStrokeWidth strokeWidth={1.5} />
    </Button>
  );
}
