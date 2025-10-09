import { UserGridItem } from "../UserGridItem";
import { UserPreview } from "@/lib/queries/types";
import { Grid } from "@/components/common/Grid/Grid";

export function UserGrid({ users }: { users: UserPreview[] }) {
  return (
    <Grid>
      {users.map((user) => (
        <UserGridItem key={user.id} user={user} />
      ))}
    </Grid>
  );
}
