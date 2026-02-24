import { mockedTaskDetail } from "@/mocks/tasks";
import { getSubtasksList } from "../../TaskDetail/__stories__";

const task = mockedTaskDetail;

export const taskDetailAltArgs = {
  ...task,
  createSubtask: () => ({ status: "success" as const }),
  subtasksList: getSubtasksList(),
};
