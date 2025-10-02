import { getUsers } from "@/lib/queries/user";
import { CheckboxGroup } from "react-aria-components";
import { fieldStyles, Label } from "../ui/Field";
import { Checkbox } from "../ui/Checkbox";

export async function UserFilter() {
  const users = await getUsers(1);
  const itemClasses = "capitalize font-normal";

  if (!users.length) {
    return null;
  }

  return (
    <CheckboxGroup className={fieldStyles()}>
      <Label>Creator</Label>
      {users.map((user) => (
        <Checkbox value={user.id.toString()} className={itemClasses}>
          {user.name}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
