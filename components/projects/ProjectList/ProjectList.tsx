"use client";

import { Children } from "react";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { ProjectListItemSkeleton } from "../ProjectListItem";
import { useEntityListPending } from "@/lib/hooks/useEntityListPending";

interface ProjectListProps {
  showCheckbox?: boolean;
  children: React.ReactNode;
}

export function ProjectList({ showCheckbox, children }: ProjectListProps) {
  const isPending = useEntityListPending();

  if (isPending) {
    return (
      <List data-test="projects-list">
        <Repeat
          items={Children.count(children)}
          renderItem={() => (
            <ProjectListItemSkeleton showCheckbox={showCheckbox} />
          )}
        />
      </List>
    );
  }

  return <List data-test="projects-list">{children}</List>;
}
