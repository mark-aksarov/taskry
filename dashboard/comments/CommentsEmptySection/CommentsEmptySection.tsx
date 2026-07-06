import {
  FallbackSection,
  FallbackSectionHeading,
  FallbackSectionDescription,
} from "@/common/FallbackSection";
import { useTranslations } from "next-intl";
import { AbsoluteCenter } from "@/dashboard/common/AbsoluteCenter";

export function CommentsEmptySection() {
  const t = useTranslations("dashboard.comments.CommentsEmptySection");

  return (
    <AbsoluteCenter className="w-full p-5">
      <FallbackSection data-test="comments-empty-section">
        <FallbackSectionHeading tag="h3" className="text-3xl!">
          {t("heading")}
        </FallbackSectionHeading>
        <FallbackSectionDescription>
          {t("description")}
        </FallbackSectionDescription>
      </FallbackSection>
    </AbsoluteCenter>
  );
}
