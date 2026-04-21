import { useTranslations } from "next-intl";
import { ErrorBanner } from "@/common/ErrorBanner";
import { ActionState } from "@/lib/actions/types";

interface UpdatePersonImageErrorBannerProps {
  updatePersonImageState: ActionState;
  isUpdatePersonImagePending: boolean;
}

export function UpdatePersonImageErrorBanner({
  updatePersonImageState,
  isUpdatePersonImagePending,
}: UpdatePersonImageErrorBannerProps) {
  const t = useTranslations("dashboard.common.UpdatePersonImageDialog");

  if (
    updatePersonImageState.status === "error" &&
    !isUpdatePersonImagePending
  ) {
    return (
      <ErrorBanner>{updatePersonImageState.message || t("error")}</ErrorBanner>
    );
  }
}
