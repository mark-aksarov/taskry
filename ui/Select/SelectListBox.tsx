"use client";

import React from "react";
import { itemStyles } from "../styles";
import { twMerge } from "tailwind-merge";
import { ListState, Node } from "react-stately";
import { ListBoxProps } from "react-aria-components";
import { mergeProps, useHover, useListBox, useOption } from "react-aria";

export type SelectListBoxProps<T extends object = any> = Omit<
  ListBoxProps<T>,
  "className"
> & {
  state: ListState<T>;
  className?: string;
  optionClassName?: string;
};

export const SelectListBox = <T extends object>({
  state,
  ...props
}: SelectListBoxProps<T>) => {
  const ref = React.useRef(null);
  const { listBoxProps } = useListBox(props, state, ref);

  return (
    <ul
      {...listBoxProps}
      ref={ref}
      className={twMerge(props.className, "outline-hidden")}
    >
      {[...state.collection].map((item) => (
        <Option
          key={item.key}
          item={item}
          state={state}
          className={props.optionClassName}
        />
      ))}
    </ul>
  );
};

interface OptionProps<T extends object = any>
  extends React.HTMLAttributes<HTMLLIElement> {
  item: Node<T>;
  state: ListState<T>;
}

export const Option = <T extends object>({
  item,
  state,
  className,
  ...props
}: OptionProps<T>) => {
  const ref = React.useRef(null);
  const { optionProps, ...states } = useOption({ key: item.key }, state, ref);
  const { hoverProps, isHovered } = useHover({});

  const classes = itemStyles({
    isHovered,
    isFocused: states.isFocused,
    isDisabled: states.isDisabled,
    className,
  });

  return (
    <li
      {...mergeProps(optionProps, hoverProps, props)}
      ref={ref}
      className={classes}
    >
      {item.rendered}
    </li>
  );
};
