"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { CustomerSelect } from "../../customer/CustomerSelect";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { useUpdateProjectCustomer } from "../UpdateProjectCustomerContext";

interface UpdateProjectCustomerFormProps {
  projectId: number;
  customerId?: number;
  customerSelectItems: { id: number; fullName: string }[];
}

export function UpdateProjectCustomerForm({
  projectId,
  customerId,
  customerSelectItems,
}: UpdateProjectCustomerFormProps) {
  const { state, isPending, action } = useUpdateProjectCustomer();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-project-customer-form" onSubmit={handleSubmit}>
      {projectId && <input type="hidden" name="id" value={projectId} />}
      <CustomerSelect
        defaultSelectedKey={customerId?.toString()}
        items={customerSelectItems}
      />
      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
