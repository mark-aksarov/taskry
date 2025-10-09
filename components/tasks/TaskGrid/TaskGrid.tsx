import { TaskGridItem } from "../TaskGridItem";
import { TaskPreview } from "@/lib/queries/types";
import { Grid } from "@/components/common/Grid/Grid";

export function TaskGrid({ tasks }: { tasks: TaskPreview[] }) {
  return (
    <Grid>
      {tasks.map((task) => (
        <TaskGridItem key={task.id} task={task} />
      ))}
    </Grid>
  );
}
