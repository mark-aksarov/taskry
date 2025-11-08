import { Grid } from "@/components/common/Grid";
import { UserGridItem, UserGridItemType } from "../UserGridItem";

export function UserGrid({ users }: { users: UserGridItemType[] }) {
  return (
    <Grid>
      {users.map((user) => (
        <UserGridItem key={user.id} user={user} />
      ))}
    </Grid>
  );
}
