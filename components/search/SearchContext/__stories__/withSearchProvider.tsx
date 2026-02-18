import { type Decorator } from "@storybook/react";
import { SearchContext } from "../SearchContext";
import { SearchField } from "../../SearchField";
import { SearchToggleButtonGroup } from "../../SearchToggleButtonGroup";

export const withSearchProvider: Decorator = (Story) => {
  return (
    <SearchContext.Provider
      value={{
        query: "test",
        page: 1,
        setPage: () => {},
        searchCategory: "tasks",
        searchField: <SearchField value="" onChange={() => {}} />,
        searchToggleButtonGroup: (
          <SearchToggleButtonGroup selectedKeys={["tasks"]} />
        ),
      }}
    >
      <Story />
    </SearchContext.Provider>
  );
};
