import {
  EmptySection,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";
import { useTranslations } from "next-intl";

export function CommentsEmptySection() {
  const t = useTranslations("comments.CommentsEmptySection");

  return (
    <div className="flex min-h-[400px] flex-auto items-center justify-center">
      <EmptySection
        data-test="comments-empty-section"
        className="max-w-[375px]"
      >
        <EmptySectionHeading tag="h3" className="text-3xl!">
          {t("heading")}
        </EmptySectionHeading>
        <EmptySectionDescription>{t("description")}</EmptySectionDescription>
      </EmptySection>
    </div>
  );
}
