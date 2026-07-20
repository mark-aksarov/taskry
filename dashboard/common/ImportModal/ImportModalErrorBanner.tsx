import { useTranslations } from "next-intl";
import { ActionState } from "@/lib/actions/types";
import { ErrorBanner } from "@/common/ErrorBanner";

interface ImportModalErrorBannerProps {
  fileSizeError: boolean;
  state: ActionState;
  isPending: boolean;
}

export function ImportModalErrorBanner({
  fileSizeError,
  state,
  isPending,
}: ImportModalErrorBannerProps) {
  const t = useTranslations("dashboard.common.ImportModalErrorBanner");

  const error = fileSizeError
    ? t("error.fileSize")
    : state.status === "error"
      ? state.message
      : null;

  return (
    <>
      {error && !isPending && (
        <ErrorBanner className="mt-4">{error}</ErrorBanner>
      )}
    </>
  );
}
