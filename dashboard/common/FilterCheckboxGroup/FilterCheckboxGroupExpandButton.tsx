import { useTranslations } from "next-intl";
import { TextButton } from "@/common/TextButton";
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
  const t = useTranslations("dashboard.common.FilterCheckboxGroupExpandButton");

  // Don't render button if the list can't be expanded
  if (isExpanded === null) return null;

  let content;

  if (isExpanded) {
    content = (
      <>
        {t("collapse")}
        <ChevronUp    />
      </>
    );
  } else {
    if (hiddenSelectedItemNames.length > 0) {
      content = (
        <>
          <Plus
            
            
            
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
          <ChevronDown    />
        </>
      );
    }
  }

  return (
    <TextButton
      onPress={() => setIsExpanded(!isExpanded)}
      className="max-w-full font-medium"
    >
      {content}
    </TextButton>
  );
}
