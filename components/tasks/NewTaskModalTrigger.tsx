"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { NewTaskModal } from "./NewTaskModal";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";

interface NewTaskModalTriggerProps {
  newTaskFormContainer: React.ReactNode;
}

export function NewTaskModalTrigger({
  newTaskFormContainer,
}: NewTaskModalTriggerProps) {
  const t = useTranslations("tasks.NewTaskModalTrigger");

  return (
    <DialogTrigger>
      <Button
        label={t("label")}
        iconLeft={<Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      />
      <NewTaskModal newTaskFormContainer={newTaskFormContainer} />
    </DialogTrigger>
  );
}
