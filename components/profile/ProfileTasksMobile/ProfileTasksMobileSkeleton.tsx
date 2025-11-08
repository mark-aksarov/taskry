import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { ProfileTaskListItem } from "../ProfileTaskListItem";

export function ProfileTasksMobileSkeleton() {
  return (
    <List>
      <Repeat items={10} renderItem={() => <ProfileTaskListItem />} />
    </List>
  );
}
