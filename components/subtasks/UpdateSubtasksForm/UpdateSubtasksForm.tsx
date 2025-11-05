"use client";

import { Plus, X } from "lucide-react";
import { Button, Checkbox, RACForm } from "@/components/ui";
import { SubtaskTextField } from "../SubtaskTextField";
import { Subtask } from "@/generated/prisma";
import { useState } from "react";
import { UpdateSubtasksFormFieldset } from "./UpdateSubtasksFormFieldset";
import { UpdateSubtasksFormLegend } from "./UpdateSubtasksFormLegend";

export function UpdateSubtasksForm({
  initialSubtasks,
}: {
  initialSubtasks: Pick<Subtask, "id" | "name" | "isDone">[];
}) {
  const [subtasks, setSubtasks] = useState(initialSubtasks);

  function removeSubtask(index: number) {
    setSubtasks((prev) => prev.filter((_, i) => i !== index));
  }

  function addSubtask() {
    setSubtasks((prev) => [
      ...prev,
      {
        id: -1,
        name: "",
        isDone: false,
      },
    ]);
  }

  function updateSubtaskName(index: number, name: string) {
    setSubtasks((prev) =>
      prev.map((s, i) => (i === index ? { ...s, name } : s)),
    );
  }

  function toggleSubtaskDone(index: number) {
    setSubtasks((prev) =>
      prev.map((s, i) => (i === index ? { ...s, isDone: !s.isDone } : s)),
    );
  }

  return (
    <RACForm>
      <div className="flex flex-col gap-4">
        {subtasks.map((subtask, index) => (
          <UpdateSubtasksFormFieldset key={index}>
            <UpdateSubtasksFormLegend>
              {`Subtask ${index + 1}`}
            </UpdateSubtasksFormLegend>

            <SubtaskTextField
              label="Name"
              value={subtask.name}
              onChange={(value) => updateSubtaskName(index, value)}
              placeholder="Type a subtask name"
              actionButton={
                index !== subtasks.length - 1 ? (
                  <Button
                    iconLeft={
                      <X size={16} strokeWidth={1.5} absoluteStrokeWidth />
                    }
                    variant="ghost"
                    className="rounded-full"
                    onPress={() => removeSubtask(index)}
                  />
                ) : (
                  <Button
                    iconLeft={
                      <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
                    }
                    variant="ghost"
                    className="rounded-full"
                    onPress={addSubtask}
                  />
                )
              }
            />

            <Checkbox
              className="text-xs"
              isSelected={subtask.isDone}
              onChange={() => toggleSubtaskDone(index)}
            >
              Mark As Done
            </Checkbox>
          </UpdateSubtasksFormFieldset>
        ))}
      </div>
    </RACForm>
  );
}
