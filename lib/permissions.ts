import { createAccessControl } from "better-auth/plugins/access";

export const statement = {
  project: ["create", "update", "delete"],
  task: ["create", "update", "update-status", "delete"],
  comment: ["create", "update", "delete"],
  customer: ["create", "update", "delete"],
  user: ["create", "update", "delete"],
  notification: ["delete", "mark-as-read"],
} as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  project: ["create", "update", "delete"],
  task: ["create", "update", "update-status", "delete"],
  comment: ["create", "update", "delete"],
  customer: ["create", "update", "delete"],
  user: ["create", "update", "delete"],
  notification: ["delete", "mark-as-read"],
});

export const owner = ac.newRole({
  project: ["create", "update", "delete"],
  task: ["create", "update", "update-status", "delete"],
  comment: ["create", "update", "delete"],
  customer: ["create", "update", "delete"],
  user: ["create", "update", "delete"],
  notification: ["delete", "mark-as-read"],
});

export const manager = ac.newRole({
  project: ["create", "update", "delete"],
  task: ["create", "update", "update-status", "delete"],
  comment: ["create", "update", "delete"],
  customer: ["create", "update", "delete"],
  user: [],
  notification: ["delete", "mark-as-read"],
});

export const user = ac.newRole({
  project: [],
  task: ["update-status"],
  comment: ["create", "update", "delete"],
  customer: [],
  user: [],
  notification: ["delete", "mark-as-read"],
});

export const guest = ac.newRole({
  project: [],
  task: [],
  comment: [],
  customer: [],
  user: [],
});
