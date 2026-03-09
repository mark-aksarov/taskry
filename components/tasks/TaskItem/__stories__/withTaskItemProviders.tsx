import { type Decorator } from "@storybook/react";
import { TaskStatus } from "@/generated/prisma/enums";
import { TaskItemProviders } from "../TaskItemProviders";

export const withTaskItemProviders: Decorator = (Story) => {
  return (
    <TaskItemProviders
      taskId={1}
      taskStatus={TaskStatus.active}
      updateTask={() => ({ status: "success" })}
      deleteTask={() => ({ status: "success" })}
      updateTaskStatus={() => ({ status: "success" })}
    >
      <Story />
    </TaskItemProviders>
  );
};
