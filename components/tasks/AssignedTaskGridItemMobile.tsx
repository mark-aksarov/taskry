import {
  TaskGridItemMobileInner,
  TaskGridItemMobileProps,
} from "./TaskGridItem";

import { Link } from "@/components/ui/Link";
import { AssignedTaskItemPendingOverlay } from "./AssignedTaskItem";

export function AssignedTaskGridItemMobile(props: TaskGridItemMobileProps) {
  return (
    <AssignedTaskItemPendingOverlay>
      <div className="relative block">
        <Link href={`/tasks/${props.id}`} className="absolute inset-0 z-0" />
        <TaskGridItemMobileInner {...props} />
      </div>
    </AssignedTaskItemPendingOverlay>
  );
}
