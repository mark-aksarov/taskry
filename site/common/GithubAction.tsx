import { Github } from "@/icons/Github";
import { PageSectionActionLink } from "./PageSection";

export function GithubAction() {
  return (
    <PageSectionActionLink
      href="https://github.com/mark-aksarov/taskry"
      className="bg-transparent"
      variant="secondary"
      outlined
      label="Github"
      iconLeft={<Github />}
    />
  );
}
