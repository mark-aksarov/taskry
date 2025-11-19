import { NewTaskForm } from "../NewTaskForm";
import {
  TaskFormBaseAssigneeSelect,
  TaskFormBaseCategorySelect,
  TaskFormBaseProjectSelect,
  TaskFormBaseSkeleton,
  TaskFormBaseStatusSelect,
} from "../TaskFormBase";
import { GeUserSummariesType } from "@/lib/queries/user";
import {
  GetTaskCategorySummariesType,
  GetTaskStatusSummariesType,
} from "@/lib/queries/task";
import useSWR from "swr";
import { GetProjectSummariesType } from "@/lib/queries/project";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function EditTaskFormClientContainer() {
  const { data: statuses } = useSWR<GetTaskStatusSummariesType>(
    `/api/task-statuses`,
    fetcher,
    { suspense: true },
  );
  const { data: categories } = useSWR<GetTaskCategorySummariesType>(
    `/api/task-categories`,
    fetcher,
    { suspense: true },
  );
  const { data: projects } = useSWR<GetProjectSummariesType>(
    `/api/projects`,
    fetcher,
    { suspense: true },
  );
  const { data: users } = useSWR<GeUserSummariesType>(`/api/users`, fetcher, {
    suspense: true,
  });

  if (!statuses || !categories || !projects || !users) return null;

  return (
    <NewTaskForm
      taskStatusSelect={
        <TaskFormBaseStatusSelect
          statuses={statuses.map((s) => ({ id: s.id, name: s.nameEn }))}
        />
      }
      taskCategorySelect={
        <TaskFormBaseCategorySelect
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        />
      }
      projectSelect={
        <TaskFormBaseProjectSelect
          projects={projects.map((p) => ({ id: p.id, title: p.title }))}
        />
      }
      assigneeSelect={
        <TaskFormBaseAssigneeSelect
          users={users.map((u) => ({ id: u.id, fullName: u.fullName }))}
        />
      }
    />
  );
}
