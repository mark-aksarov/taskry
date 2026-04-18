import {
  TaskGridItemMobileProps,
  TaskGridItemMobileInner,
} from "./TaskGridItem";

import { useAssignedTaskItemPending } from "./useAssignedTaskItemPending";

export function AssignedTaskGridItemMobile(props: TaskGridItemMobileProps) {
  const isPending = useAssignedTaskItemPending();
  return <TaskGridItemMobileInner {...props} isPending={isPending} />;
}
