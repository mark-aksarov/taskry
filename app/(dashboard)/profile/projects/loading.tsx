import { Repeat } from "@/components/common/Repeat";
import { List } from "@/components/common/List";
import { ProjectListItem } from "@/components/projects/ProjectListItem";

export default function Loading() {
  return (
    <List>
      <Repeat items={10} renderItem={() => <ProjectListItem />} />
    </List>
  );
}
