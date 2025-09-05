import React from "react";
import { useMenu } from "react-aria";
import { MenuItem } from "./MenuItem";
import { useTreeState } from "react-stately";
import type { AriaMenuProps } from "react-aria";

export const Menu = <T extends object>(props: AriaMenuProps<T>) => {
  const state = useTreeState(props);

  const ref = React.useRef(null);
  const { menuProps } = useMenu(props, state, ref);

  return (
    <ul
      {...menuProps}
      ref={ref}
      className="flex flex-col py-1.5 outline-hidden"
    >
      {[...state.collection].map((item) => (
        <MenuItem key={item.key} item={item} state={state} />
      ))}
    </ul>
  );
};
