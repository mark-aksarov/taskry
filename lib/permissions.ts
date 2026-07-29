import {
  ownerAc,
  memberAc,
  defaultStatements,
} from "better-auth/plugins/organization/access";
import { createAccessControl } from "better-auth/plugins/access";

const statements = {
  project: ["create", "update", "delete"],
  task: ["create", "update", "delete"],
  subtask: ["create", "update", "delete"],
  comment: ["create", "update", "delete"],
  client: ["create", "update", "delete"],
  user: ["create", "update", "change-password", "delete"],
  company: ["create", "update", "delete"],
  position: ["create", "update", "delete"],
  projectCategory: ["create", "update", "delete"],
  taskCategory: ["create", "update", "delete"],
  demo: ["create"],
};

export const ac = createAccessControl({
  ...defaultStatements,
  ...statements,
});

export const owner = ac.newRole({
  ...ownerAc.statements,
  ...statements,
});

export const member = ac.newRole({
  ...memberAc.statements,
  ...statements,
  user: ["update", "change-password"],
  demo: [],
});
