import { createAccessControl } from "better-auth/plugins/access";

const statements = {
  project: ["create", "update", "delete"],
  task: ["create", "update", "delete"],
  comment: ["create", "update", "delete"],
  customer: ["create", "update", "delete"],
  user: ["create", "update", "delete"],
  notification: ["delete", "update"],
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
  comment: [],
  customer: [],
  user: [],
  notification: [],
});
