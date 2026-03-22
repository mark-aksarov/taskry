import { AbsoluteCenter } from "@/components/common/AbsoluteCenter";
import {
  EmptySection,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";
import { useTranslations } from "next-intl";

export function CommentsEmptySection() {
  const t = useTranslations("comments.CommentsEmptySection");

  return (
    <AbsoluteCenter className="w-full p-5">
      <EmptySection data-test="comments-empty-section">
        <EmptySectionHeading tag="h3" className="text-3xl!">
          {t("heading")}
        </EmptySectionHeading>
        <EmptySectionDescription>{t("description")}</EmptySectionDescription>
      </EmptySection>
    </AbsoluteCenter>
  );
}
