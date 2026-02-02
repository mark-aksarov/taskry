import "server-only";

import {
  UserFormBaseSkeleton,
  UserFormBasePositionSelect,
} from "./UserFormBase";

import { Suspense } from "react";
import { NewUserForm } from "./NewUserForm";
import { createUser } from "@/lib/actions/user/createUser";
import { getPositionSummaries } from "@/lib/data/position/position.service";

export function NewUserFormContainer() {
  return (
    <Suspense fallback={<UserFormBaseSkeleton />}>
      <NewUserFormContainerInner />
    </Suspense>
  );
}

async function NewUserFormContainerInner() {
  const positions = await getPositionSummaries();

  return (
    <NewUserForm
      positionSelect={<UserFormBasePositionSelect positions={positions} />}
      formAction={createUser}
    />
  );
}
