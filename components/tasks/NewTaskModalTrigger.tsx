"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { FormBaseModal } from "../common/FormBaseModal";

interface NewTaskModalTriggerProps {
  newTaskForm: React.ReactNode;
}

export function NewTaskModalTrigger({ newTaskForm }: NewTaskModalTriggerProps) {
  const t = useTranslations("tasks.NewTaskModalTrigger");

  return (
    <DialogTrigger>
      <Button
        label={t("label")}
        iconLeft={<Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      />
      <FormBaseModal
        formId="new-task-form"
        title={t("title")}
        form={newTaskForm}
        submitButtonLabel={t("submitButtonLabel")}
      />
    </DialogTrigger>
  );
}
