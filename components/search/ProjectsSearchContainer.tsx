"use client";

import { ProjectSearchListItem } from "./ProjectSearchListItem";
import { ProjectSearchItemDTO } from "@/lib/data/project/project.dto";
import { SearchContainer, SearchContainerProps } from "./SearchContainer";

type ProjectsSearchContainerProps = Omit<
  SearchContainerProps<ProjectSearchItemDTO>,
  "endpoint" | "renderItem"
>;

export function ProjectsSearchContainer(props: ProjectsSearchContainerProps) {
  return (
    <SearchContainer
      endpoint="/api/projects/search"
      renderItem={(item: ProjectSearchItemDTO) => (
        <ProjectSearchListItem
          key={item.id}
          id={item.id}
          title={item.title}
          deadline={new Date(item.deadline)}
        />
      )}
      {...props}
    />
  );
}
