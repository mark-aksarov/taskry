import { TaskGridItem, TaskGridItemType } from "../TaskGridItem";
import { Grid } from "@/components/common/Grid/Grid";

export function TaskGrid({ tasks }: { tasks: TaskGridItemType[] }) {
  return (
    <Grid>
      {tasks.map((task) => (
        <TaskGridItem key={task.id} task={task} />
      ))}
    </Grid>
  );
}
