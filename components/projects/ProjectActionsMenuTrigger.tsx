import { useOverlayTrigger } from "react-aria";
import { Item, useOverlayTriggerState } from "react-stately";
import { MenuTrigger } from "../ui/Menu";
import { Button } from "../ui/Button";
import { Ellipsis, Trash } from "lucide-react";

export const ProjectActionsMenuTrigger = () => {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  const itemClasses = "flex items-center gap-4 font-bold";

  return (
    <MenuTrigger
      renderButton={() => (
        <>
          <Button
            {...triggerProps}
            aria-label="actions"
            variant="outlined"
            iconLeft={
              <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
            className="md:hidden"
          />
          <Button
            {...triggerProps}
            aria-label="actions"
            label="Actions"
            variant="outlined"
            iconLeft={
              <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
            className="max-md:hidden"
          />
        </>
      )}
      placement="bottom right"
    >
      <Item textValue="Delete" key="delete">
        <div className={itemClasses}>
          <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
          Remove
        </div>
      </Item>
    </MenuTrigger>
  );
};
