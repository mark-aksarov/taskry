import { createAccessControl } from "better-auth/plugins/access";

const statements = {
  project: ["create", "update", "delete"],
  task: ["create", "update", "delete"],
  subtask: ["create", "update", "delete"],
  comment: ["create", "update", "delete"],
  customer: ["create", "update", "delete"],
  user: ["create", "update", "delete"],
  notification: ["delete", "update"],
  company: ["create", "update", "delete"],
  position: ["create", "update", "delete"],
  projectCategory: ["create", "update", "delete"],
  taskCategory: ["create", "update", "delete"],
};

export const ac = createAccessControl(statements);

export const admin = ac.newRole(statements);
export const owner = ac.newRole(statements);

export const user = ac.newRole({
  ...statements,
  user: [],
});

export const guest = ac.newRole({
  project: [],
  task: [],
  subtask: [],
  comment: [],
  customer: [],
  user: [],
  notification: [],
  company: [],
  position: [],
  projectCategory: [],
  taskCategory: [],
});
