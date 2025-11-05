"use client";

import { use } from "react";
import { Item } from "react-stately";
import { Project } from "@/generated/prisma";
import { ResponsiveSelect } from "../common/ResponsiveSelect";

export function ProjectSelect({
  projectsPromise,
}: {
  projectsPromise: Promise<Project[]>;
}) {
  const projects = use(projectsPromise);

  if (!projects.length) {
    return null;
  }

  return (
    <ResponsiveSelect
      label="Project"
      placeholder="Select project"
      overlayClassName="w-[var(--trigger-width)]"
      items={projects.map((item) => ({ id: item.id, label: item.title }))}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
