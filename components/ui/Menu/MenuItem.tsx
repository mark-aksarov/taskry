import React from "react";
import { itemStyles } from "../styles";
import { Node, TreeState } from "react-stately";
import { mergeProps, useHover, useMenuItem } from "react-aria";
import { twMerge } from "tailwind-merge";

interface MenuItemProps<T extends object = any>
  extends React.HTMLAttributes<HTMLLIElement> {
  item: Node<T>;
  state: TreeState<any>;
}

export const MenuItem = ({
  item,
  className,
  state,
  ...props
}: MenuItemProps) => {
  const ref = React.useRef(null);
  const { menuItemProps, ...states } = useMenuItem(
    { key: item.key },
    state,
    ref,
  );
  const { hoverProps, isHovered } = useHover({});

  const classes = twMerge(
    className,
    itemStyles({ isHovered, isFocused: states.isFocused }),
  );

  return (
    <li
      {...mergeProps(menuItemProps, hoverProps, props)}
      ref={ref}
      className={classes}
    >
      {item.rendered}
    </li>
  );
};
