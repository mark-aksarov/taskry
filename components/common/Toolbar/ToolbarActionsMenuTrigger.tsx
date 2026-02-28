import { ToolbarMenuTrigger } from "./ToolbarMenuTrigger";
import { usePageTransition } from "../PageTransitionContext";
import { ResponsiveMenuTriggerProps } from "../ResponsiveMenuTrigger";
import { ToolbarActionsButtonMobile } from "./ToolbarActionsButtonMobile";
import { ToolbarActionsButtonDesktop } from "./ToolbarActionsButtonDesktop";

interface ToolbarActionsMenuTriggerProps
  extends Omit<ResponsiveMenuTriggerProps, "renderButton"> {
  selectedIds: number[];
}

export function ToolbarActionsMenuTrigger({
  selectedIds,
  ...props
}: ToolbarActionsMenuTriggerProps) {
  const { isFilteringPending, isSortingPending, isPaginationPending } =
    usePageTransition();

  // Disable actions during transitions, without selection, or while deleting
  const isDisabled =
    isFilteringPending ||
    isSortingPending ||
    isPaginationPending ||
    selectedIds.length === 0;

  return (
    <ToolbarMenuTrigger
      {...props}
      renderButton={() => (
        <>
          <ToolbarActionsButtonMobile
            data-test="toolbar-actions-button-mobile"
            isDisabled={isDisabled}
          />
          <ToolbarActionsButtonDesktop
            data-test="toolbar-actions-button-desktop"
            isDisabled={isDisabled}
          />
        </>
      )}
    />
  );
}
