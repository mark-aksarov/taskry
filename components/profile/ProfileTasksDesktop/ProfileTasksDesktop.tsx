import { ProfileTaskList } from "../ProfileTaskList";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import {
  ProfileTaskListItem,
  type ProfileTaskListItemType,
} from "../ProfileTaskListItem";

export function ProfileTasksDesktop({
  tasks,
}: {
  tasks?: ProfileTaskListItemType[];
}) {
  if (!tasks)
    return (
      <List className="gap-0 px-6">
        <Repeat items={10} renderItem={() => <ProfileTaskListItem />} />
      </List>
    );

  return <ProfileTaskList tasks={tasks} className="gap-0 px-6 max-md:hidden" />;
}
