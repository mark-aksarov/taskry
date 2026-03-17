"use client";

import { List } from "@/components/common/List";
import { ProjectListSkeleton } from "./ProjectListSkeleton";
import { useEntityListPending } from "@/lib/hooks/useEntityListPending";
import { Children } from "react";

interface ProjectListProps {
  children: React.ReactNode;
}

export function ProjectList({ children }: ProjectListProps) {
  const isPending = useEntityListPending();

  if (isPending) {
    return <ProjectListSkeleton items={Children.count(children)} />;
  }

  return <List data-test="projects-list">{children}</List>;
}
