import { useTranslations } from "next-intl";
import { Button } from "react-aria-components";
import { linkStyles } from "@/components/ui/Link";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";

interface FilterCheckboxGroupExpandButtonProps {
  isExpanded: boolean | null;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean | null>>;
  hiddenSelectedItemNames: string[];
}

export function FilterCheckboxGroupExpandButton({
  isExpanded,
  setIsExpanded,
  hiddenSelectedItemNames,
}: FilterCheckboxGroupExpandButtonProps) {
  const t = useTranslations("common.FilterCheckboxGroupExpandButton");

  // Don't render button if the list can't be expanded
  if (isExpanded === null) return null;

  let content;

  if (isExpanded) {
    content = (
      <>
        {t("collapse")}
        <ChevronUp size={16} absoluteStrokeWidth strokeWidth={1.5} />
      </>
    );
  } else {
    if (hiddenSelectedItemNames.length > 0) {
      content = (
        <>
          <Plus
            size={16}
            absoluteStrokeWidth
            strokeWidth={1.5}
            className="shrink-0"
          />
          <div className="shrink-0">
            {t("more")} {hiddenSelectedItemNames.length}
          </div>
          <div className="truncate">
            ({hiddenSelectedItemNames?.join(", ")})
          </div>
        </>
      );
    } else {
      content = (
        <>
          {t("expand")}
          <ChevronDown size={16} absoluteStrokeWidth strokeWidth={1.5} />
        </>
      );
    }
  }

  return (
    <Button
      onPress={() => setIsExpanded(!isExpanded)}
      className={linkStyles({
        variant: "primary",
        className: "max-w-full text-sm",
      })}
    >
      {content}
    </Button>
  );
}
