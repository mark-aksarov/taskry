import React from "react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@/lib/utils/test-utils";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { TaskItemActionMenuTrigger } from "./TaskItemActionMenuTrigger";

describe("TaskItemActionMenuTrigger", () => {
  it("renders with items", async () => {
    render(
      <TaskItemActionMenuTrigger
        taskId={1}
        taskTitle="Task 1"
        taskStatus={TaskStatus.active}
        projectStatus={ProjectStatus.active}
        guestMode={false}
        canDelete={false}
        canUpdate={false}
        canUpdateStatus={false}
        deleteAction={vi.fn()}
        updateStatusAction={vi.fn()}
      />,
    );

    const button = screen.getByRole("button");
    const user = userEvent.setup();

    await user.click(button);

    const items = screen.getAllByRole("menuitem");
    expect(items).toHaveLength(5);
    expect(items[0]).toHaveTextContent(/edit/i);
    expect(items[1]).toHaveTextContent(/delete/i);
    expect(items[2]).toHaveTextContent(/pending/i);
    expect(items[3]).toHaveTextContent(/completed/i);
    expect(items[4]).toHaveTextContent(/active/i);
  });
});
