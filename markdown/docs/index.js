import fs from "fs";

const files = [
  "markdown/docs/clients/actions.en.mdx",
  "markdown/docs/clients/actions.ru.mdx",
  "markdown/docs/clients/companies.en.mdx",
  "markdown/docs/clients/companies.ru.mdx",
  "markdown/docs/clients/search.en.mdx",
  "markdown/docs/clients/search.ru.mdx",
  "markdown/docs/clients/view.en.mdx",
  "markdown/docs/clients/view.ru.mdx",
  "markdown/docs/projects/actions.en.mdx",
  "markdown/docs/projects/actions.ru.mdx",
  "markdown/docs/projects/categories.en.mdx",
  "markdown/docs/projects/categories.ru.mdx",
  "markdown/docs/projects/search.en.mdx",
  "markdown/docs/projects/search.ru.mdx",
  "markdown/docs/projects/view.en.mdx",
  "markdown/docs/projects/view.ru.mdx",
  "markdown/docs/tasks/actions.en.mdx",
  "markdown/docs/tasks/actions.ru.mdx",
  "markdown/docs/tasks/categories.en.mdx",
  "markdown/docs/tasks/categories.ru.mdx",
  "markdown/docs/tasks/search.en.mdx",
  "markdown/docs/tasks/search.ru.mdx",
  "markdown/docs/tasks/subtasks.en.mdx",
  "markdown/docs/tasks/subtasks.ru.mdx",
  "markdown/docs/tasks/view.en.mdx",
  "markdown/docs/tasks/view.ru.mdx",
  "markdown/docs/team/actions.en.mdx",
  "markdown/docs/team/actions.ru.mdx",
  "markdown/docs/team/positions.en.mdx",
  "markdown/docs/team/positions.ru.mdx",
  "markdown/docs/team/roles.en.mdx",
  "markdown/docs/team/roles.ru.mdx",
  "markdown/docs/team/search.en.mdx",
  "markdown/docs/team/search.ru.mdx",
  "markdown/docs/team/view.en.mdx",
  "markdown/docs/team/view.ru.mdx",
];

for (const filePath of files) {
  const content = fs.readFileSync(filePath, "utf8");

  const result = content.replace(
    /\b(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)\b/g,
    (_, a, b) => Math.round(Number(a) / Number(b)).toString(),
  );

  fs.writeFileSync(filePath, result);
}

console.log("Done");
