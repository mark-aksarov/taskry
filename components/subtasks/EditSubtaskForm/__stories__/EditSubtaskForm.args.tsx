export const editSubtaskFormArgs = {
  subtaskId: 1,
  taskId: 1,
  mutate: () => {},
  textDefaultValue: "Subtask 1",
  updateSubtask: () => ({ status: "success" as const }),
};
