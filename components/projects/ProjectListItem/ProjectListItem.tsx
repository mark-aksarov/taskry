"use client";

import { useMemo } from "react";
import { Link } from "@/components/ui";
import { ProjectPreview } from "@/lib/queries/types";
import { Check, CircleEllipsis, Clock, Ellipsis, Trash } from "lucide-react";
import {
  ACTIVE_PROJECT_STATUS_ID,
  DONE_TASK_STATUS_ID,
  PENDING_PROJECT_STATUS_ID,
} from "@/lib/queries/constants";
import { Item } from "react-stately";
import { Checkbox, Button } from "@/components/ui";
import Image from "next/image";
import {
  ListItem,
  ListItemActionMenuDialogHeader,
  listItemActionMenuItemStyles,
  ListItemActionMenuSkeleton,
  ListItemBadge,
  ListItemBadgeSkeleton,
  ListItemInfo,
  ListItemEllipsisWrapper,
  ListItemLink,
  ListItemInfoSkeleton,
  ListItemText,
  ListItemTitle,
  ListItemImageContainer,
  ListItemImageContainerSkeleton,
  ListItemProgress,
  ListItemProgressSkeleton,
} from "@/components/common/List/index";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

export const ProjectListItem = ({
  project,
  showCheckbox,
}: {
  project?: ProjectPreview;
  showCheckbox?: boolean;
}) => {
  const locale = "en-GB";

  const formattedDeadline = useMemo(() => {
    if (!project?.deadline) return "";
    return new Date(project.deadline).toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [project?.deadline, locale]);

  const progressValue = useMemo(() => {
    if (!project || project.tasks.length === 0) return 0;
    const tasksDone = project.tasks.filter(
      (task) => task.statusId === DONE_TASK_STATUS_ID,
    ).length;
    return (tasksDone / project.tasks.length) * 100;
  }, [project]);

  return (
    <ListItem>
      {project && showCheckbox && <Checkbox aria-label="project checkbox" />}

      {/* --- Project Details --- */}
      {!project ? (
        <ListItemInfoSkeleton />
      ) : (
        <ListItemInfo>
          <ListItemEllipsisWrapper>
            <ListItemTitle>
              <ListItemLink href={`/projects/${project.id}`}>
                {project.title}
              </ListItemLink>
            </ListItemTitle>
          </ListItemEllipsisWrapper>

          <ListItemEllipsisWrapper>
            <ListItemText>{`Deadline on ${formattedDeadline}`}</ListItemText>
          </ListItemEllipsisWrapper>
        </ListItemInfo>
      )}

      {/* --- Category --- */}
      {!project ? (
        <ListItemInfoSkeleton className="@max-3xl:hidden" />
      ) : (
        <ListItemInfo className="@max-3xl:hidden">
          <ListItemEllipsisWrapper>
            <ListItemTitle>Category</ListItemTitle>
          </ListItemEllipsisWrapper>

          <ListItemEllipsisWrapper>
            <ListItemText>
              <ListItemLink href={`/categories=${project.category.id}`}>
                {project.category.name}
              </ListItemLink>
            </ListItemText>
          </ListItemEllipsisWrapper>
        </ListItemInfo>
      )}

      {/* --- Customer --- */}
      {!project ? (
        <ListItemInfoSkeleton className="@max-5xl:hidden" />
      ) : (
        <ListItemInfo className="@max-5xl:hidden">
          <ListItemEllipsisWrapper>
            <ListItemTitle>Customer</ListItemTitle>
          </ListItemEllipsisWrapper>

          {project.customer ? (
            <ListItemEllipsisWrapper>
              <ListItemText>
                <ListItemLink href={`/customers=${project.customer.id}`}>
                  {project.customer.fullName}
                </ListItemLink>
              </ListItemText>
            </ListItemEllipsisWrapper>
          ) : (
            <ListItemEllipsisWrapper>
              <ListItemText>Unknown customer</ListItemText>
            </ListItemEllipsisWrapper>
          )}
        </ListItemInfo>
      )}

      {/* --- Customer company --- */}
      {!project ? (
        <ListItemInfoSkeleton className="@max-5xl:hidden" />
      ) : (
        <ListItemInfo className="@max-5xl:hidden">
          <ListItemEllipsisWrapper>
            <ListItemTitle>Customer company</ListItemTitle>
          </ListItemEllipsisWrapper>

          <ListItemEllipsisWrapper>
            <ListItemText>
              {project.customer
                ? project.customer.company.name
                : "Unknown company"}
            </ListItemText>
          </ListItemEllipsisWrapper>
        </ListItemInfo>
      )}

      {/* --- Right side (progress, status, creator, menu) --- */}
      <div className="flex flex-none items-center justify-end gap-4">
        {/* --- Progress --- */}
        {!project ? (
          <ListItemProgressSkeleton />
        ) : (
          <ListItemProgress
            value={progressValue}
            showValueText={false}
            aria-label="project progress"
          />
        )}

        {/* --- Status Badge --- */}
        {!project ? (
          <ListItemBadgeSkeleton />
        ) : (
          <ListItemBadge
            color={
              project.statusId === PENDING_PROJECT_STATUS_ID
                ? "orange"
                : project.statusId === ACTIVE_PROJECT_STATUS_ID
                  ? "green"
                  : "blue"
            }
          >
            {project.status.nameEn}
          </ListItemBadge>
        )}

        {/* --- Creator Image & Menu --- */}
        <div className="flex items-center gap-2">
          {!project ? (
            <ListItemImageContainerSkeleton />
          ) : project.creator?.imageUrl ? (
            <Link href={`/users/${project.creator.id}`}>
              <ListItemImageContainer>
                <Image
                  fill
                  src={project.creator.imageUrl}
                  alt={project.creator.name}
                />
              </ListItemImageContainer>
            </Link>
          ) : (
            <ListItemImageContainer />
          )}

          {!project ? (
            <ListItemActionMenuSkeleton />
          ) : (
            <ResponsiveMenuTrigger
              placement="bottom right"
              renderDialogHeader={() => <ListItemActionMenuDialogHeader />}
              renderButton={() => (
                <Button
                  aria-label="project menu"
                  variant="ghost"
                  iconLeft={
                    <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  }
                  className="rounded-full"
                />
              )}
            >
              <Item textValue="Delete" key="delete">
                <div className={listItemActionMenuItemStyles}>
                  <Trash size={16} /> Delete
                </div>
              </Item>
              <Item textValue="Mark as Pending" key="pending">
                <div className={listItemActionMenuItemStyles}>
                  <CircleEllipsis size={16} /> Mark as Pending
                </div>
              </Item>
              <Item textValue="Mark as Competed" key="competed">
                <div className={listItemActionMenuItemStyles}>
                  <Check size={16} />
                  Mark as Competed
                </div>
              </Item>
              <Item textValue="Mark as Active" key="active">
                <div className={listItemActionMenuItemStyles}>
                  <Clock size={16} />
                  Mark as Active
                </div>
              </Item>
            </ResponsiveMenuTrigger>
          )}
        </div>
      </div>
    </ListItem>
  );
};
