"use client";

import {
  SearchCategory,
  SearchResponseDTO,
} from "@/lib/data/search/search.dto";

import useSWR from "swr";
import { Key } from "react-aria";
import { useState } from "react";
import { SearchList } from "./SearchList/SearchList";
import { SearchEmptySection } from "./SearchEmptySection";
import { SearchPresentation } from "./SearchPresentation";
import { UserSearchListItem } from "./UserSearchListItem";
import { TaskSearchListItem } from "./TaskSearchListItem";
import { ModalPagination } from "../common/ModalPagination";
import { ProjectSearchListItem } from "./ProjectSearchListItem";
import { SearchToggleButtonGroup } from "./SearchToggleButtonGroup";

const pageSize = 10;

export function SearchContainer() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<SearchCategory>("users");
  const [searchCategory, setSearchCategory] = useState<SearchCategory>("users");

  const { data, mutate } = useSWR<SearchResponseDTO>(
    `/api/search?page=${page}&pageSize=${pageSize}&query=${query}&searchCategory=${searchCategory}`,
    {
      suspense: true,
    },
  );

  if (!data || (!data.users && !data.tasks && !data.projects)) {
    return <SearchEmptySection />;
  }

  const { users, tasks, projects } = data;

  let resultSearchCategory;

  if (users) {
    resultSearchCategory = "users";
  } else if (tasks) {
    resultSearchCategory = "tasks";
  } else {
    resultSearchCategory = "projects";
  }

  const toggleButtonGroupProps = {
    usersCount: data.users?.totalCount,
    tasksCount: data.tasks?.totalCount,
    projectsCount: data.projects?.totalCount,
    selectedKeys: [resultSearchCategory],
    onSelectionChange: (keys: Set<Key>) => {
      setPage(1);
      setSearchCategory([...keys][0] as SearchCategory);
    },
  };

  const paginationProps = {
    page,
    pageSize,
    setPage,
  };

  if (users) {
    const { items, totalCount } = users;
    const totalPages = Math.ceil(totalCount / pageSize);

    return (
      <SearchPresentation
        totalPages={totalPages}
        toggleButtonGroup={
          <SearchToggleButtonGroup
            {...toggleButtonGroupProps}
            selectedKeys={["users"]}
          />
        }
        searchList={
          <SearchList>
            {items.map((item) => (
              <UserSearchListItem
                key={item.id}
                id={item.id}
                fullName={item.fullName}
                email={item.email}
                imageUrl={item.imageUrl}
              />
            ))}
          </SearchList>
        }
        pagination={
          <ModalPagination
            {...paginationProps}
            totalCount={totalCount}
            totalPages={totalPages}
          />
        }
      />
    );
  } else if (tasks) {
    const { items, totalCount } = tasks;
    const totalPages = Math.ceil(totalCount / pageSize);

    return (
      <SearchPresentation
        totalPages={totalPages}
        toggleButtonGroup={
          <SearchToggleButtonGroup
            {...toggleButtonGroupProps}
            selectedKeys={["users"]}
          />
        }
        searchList={
          <SearchList>
            {items.map((item) => (
              <TaskSearchListItem
                key={item.id}
                id={item.id}
                title={item.title}
                deadline={item.deadline}
              />
            ))}
          </SearchList>
        }
        pagination={
          <ModalPagination
            {...paginationProps}
            totalCount={totalCount}
            totalPages={totalPages}
          />
        }
      />
    );
  } else if (projects) {
    const { items, totalCount } = projects;
    const totalPages = Math.ceil(totalCount / pageSize);

    return (
      <SearchPresentation
        totalPages={totalPages}
        toggleButtonGroup={
          <SearchToggleButtonGroup
            {...toggleButtonGroupProps}
            selectedKeys={["users"]}
          />
        }
        searchList={
          <SearchList>
            {items.map((item) => (
              <ProjectSearchListItem
                key={item.id}
                id={item.id}
                title={item.title}
                deadline={item.deadline}
              />
            ))}
          </SearchList>
        }
        pagination={
          <ModalPagination
            {...paginationProps}
            totalCount={totalCount}
            totalPages={totalPages}
          />
        }
      />
    );
  }

  return null;
}
