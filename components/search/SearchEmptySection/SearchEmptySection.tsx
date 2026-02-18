import {
  EmptySection,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";
import { useTranslations } from "next-intl";

export function SearchEmptySection() {
  const t = useTranslations("search.SearchEmptySection");

  return (
    <EmptySection
      data-test="search-empty-section"
      className="absolute top-1/2 left-1/2 flex max-w-[375px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
    >
      <EmptySectionHeading tag="h3" className="text-3xl!">
        {t("heading")}
      </EmptySectionHeading>
      <EmptySectionDescription>{t("description")}</EmptySectionDescription>
    </EmptySection>
  );
}
