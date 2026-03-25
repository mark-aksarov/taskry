"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { CreateTaskModal } from "./CreateTaskModal";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";

interface CreateTaskModalTriggerProps {
  createTaskFormContainer: React.ReactNode;
}

export function CreateTaskModalTrigger({
  createTaskFormContainer,
}: CreateTaskModalTriggerProps) {
  const t = useTranslations("tasks.CreateTaskModalTrigger");

  return (
    <DialogTrigger>
      <Button
        label={t("label")}
        iconLeft={<Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      />
      <CreateTaskModal createTaskFormContainer={createTaskFormContainer} />
    </DialogTrigger>
  );
}
