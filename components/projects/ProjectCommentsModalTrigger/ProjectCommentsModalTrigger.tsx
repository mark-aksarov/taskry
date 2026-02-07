import {
  ItemBaseCommentsModalTrigger,
  ItemBaseCommentsModalTriggerProps,
} from "@/components/common/ItemBase";

export function ProjectCommentsModalTrigger(
  props: ItemBaseCommentsModalTriggerProps,
) {
  return (
    <ItemBaseCommentsModalTrigger
      {...props}
      data-test="project-comments-modal-trigger"
    />
  );
}
