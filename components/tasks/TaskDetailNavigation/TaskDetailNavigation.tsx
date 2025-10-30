"use client";

import { DetailNavigation } from "@/components/common/DetailNavigation";
import { NavigationButton } from "@/components/common/NavigationButton";
import { Divider } from "@/components/ui";
import {
  CalendarCheck,
  ChevronRight,
  FileText,
  Info,
  Mail,
  Pencil,
  Trash,
} from "lucide-react";
import { usePathname } from "next/navigation";

export function TaskDetailNavigation() {
  const pathname = usePathname();

  const actionButtons = (
    <>
      <NavigationButton variant="secondary">
        <Trash size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Delete task
      </NavigationButton>
      <NavigationButton variant="secondary">
        <Pencil size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Edit task
      </NavigationButton>
    </>
  );

  const basePattern = /^\/tasks\/\d+$/;
  const infoPattern = /^\/tasks\/\d+\/info$/;
  const commentsPattern = /^\/tasks\/\d+\/comments$/;
  const subtasksPattern = /^\/tasks\/\d+\/subtasks$/;
  const attachmentsPattern = /^\/tasks\/\d+\/attachments$/;

  return (
    <>
      <DetailNavigation className="max-md:hidden">
        <NavigationButton
          isActive={infoPattern.test(pathname) || basePattern.test(pathname)}
          variant="secondary"
          href="/tasks/1"
        >
          <Info size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Task information
        </NavigationButton>

        <NavigationButton
          isActive={commentsPattern.test(pathname)}
          variant="secondary"
          href="/tasks/1/comments"
        >
          <Mail size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Comments
        </NavigationButton>

        <NavigationButton
          isActive={subtasksPattern.test(pathname)}
          variant="secondary"
          href="/tasks/1/subtasks"
        >
          <CalendarCheck size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Subtasks
        </NavigationButton>

        <NavigationButton
          isActive={attachmentsPattern.test(pathname)}
          variant="secondary"
          href="/tasks/1/attachments"
        >
          <FileText size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Attachments
        </NavigationButton>

        <Divider />

        {actionButtons}
      </DetailNavigation>

      <DetailNavigation className="md:hidden">
        <NavigationButton variant="secondary" href="/tasks/1/info">
          <Info size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Task Information
          <ChevronRight
            className="ml-auto"
            size={18}
            strokeWidth={1.5}
            absoluteStrokeWidth
          />
        </NavigationButton>
        <NavigationButton variant="secondary" href="/tasks/1/comments">
          <Mail size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Comments
          <ChevronRight
            className="ml-auto"
            size={18}
            strokeWidth={1.5}
            absoluteStrokeWidth
          />
        </NavigationButton>
        <NavigationButton variant="secondary" href="/tasks/1/subtasks">
          <CalendarCheck size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Subtasks
          <ChevronRight
            className="ml-auto"
            size={18}
            strokeWidth={1.5}
            absoluteStrokeWidth
          />
        </NavigationButton>
        <NavigationButton variant="secondary" href="/tasks/1/attachments">
          <FileText size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Attachments
          <ChevronRight
            className="ml-auto"
            size={18}
            strokeWidth={1.5}
            absoluteStrokeWidth
          />
        </NavigationButton>

        <Divider />

        {actionButtons}
      </DetailNavigation>
    </>
  );
}
