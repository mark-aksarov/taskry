"use client";

import { Children } from "react";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { ProjectListItemSkeleton } from "../ProjectListItem";
import { useEntityPagination } from "@/components/common/EntityContainerPagination";

interface ProjectListProps {
  children: React.ReactNode;
}

export function ProjectList({ children }: ProjectListProps) {
  const { isPending } = useEntityPagination();

  if (isPending) {
    return (
      <List data-test="projects-list">
        <Repeat
          items={Children.count(children)}
          renderItem={() => <ProjectListItemSkeleton />}
        />
      </List>
    );
  }

  return <List data-test="projects-list">{children}</List>;
}
