"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { ClientSelect } from "../../client/ClientSelect";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { useUpdateProjectClient } from "../UpdateProjectClientContext";

interface UpdateProjectClientFormProps {
  projectId: number;
  clientId?: number;
  clientSelectItems: { id: number; fullName: string }[];
}

export function UpdateProjectClientForm({
  projectId,
  clientId,
  clientSelectItems,
}: UpdateProjectClientFormProps) {
  const { state, isPending, action } = useUpdateProjectClient();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-project-client-form" onSubmit={handleSubmit}>
      {projectId && <input type="hidden" name="id" value={projectId} />}
      <ClientSelect
        defaultSelectedKey={clientId?.toString()}
        items={clientSelectItems}
      />
      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
