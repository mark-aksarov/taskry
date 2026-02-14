import { SearchList } from "../SearchList";
import type { Meta, StoryObj } from "@storybook/react";
import { TaskSearchListItem } from "../../TaskSearchListItem";
import { ProjectSearchListItem } from "../../ProjectSearchListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const mockedTasks = [
  { id: 1, title: "Task 1", deadline: new Date("2025-01-01") },
  { id: 2, title: "Task 2", deadline: new Date("2025-01-02") },
  { id: 3, title: "Task 3", deadline: new Date("2025-01-03") },
  { id: 4, title: "Task 4", deadline: new Date("2025-01-04") },
  { id: 5, title: "Task 5", deadline: new Date("2025-01-05") },
  { id: 6, title: "Task 6", deadline: new Date("2025-01-06") },
  { id: 7, title: "Task 7", deadline: new Date("2025-01-07") },
  { id: 8, title: "Task 8", deadline: new Date("2025-01-08") },
  { id: 9, title: "Task 9", deadline: new Date("2025-01-09") },
  { id: 10, title: "Task 10", deadline: new Date("2025-01-10") },
];

const mockedProjects = [
  { id: 1, title: "Project 1", deadline: new Date("2025-01-01") },
  { id: 2, title: "Project 2", deadline: new Date("2025-01-02") },
  { id: 3, title: "Project 3", deadline: new Date("2025-01-03") },
  { id: 4, title: "Project 4", deadline: new Date("2025-01-04") },
  { id: 5, title: "Project 5", deadline: new Date("2025-01-05") },
];

const meta = {
  title: "components/search/SearchList",
  component: SearchList,
  decorators: [withThemedBackground],
} satisfies Meta<typeof SearchList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TasksSearchList = {
  args: {
    children: mockedTasks.map((task) => (
      <TaskSearchListItem key={task.id} {...task} />
    )),
  },
} satisfies Story;

export const ProjectsSearchList = {
  args: {
    children: mockedProjects.map((project) => (
      <ProjectSearchListItem key={project.id} {...project} />
    )),
  },
} satisfies Story;
