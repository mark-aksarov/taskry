"use client";

import {
  composeRenderProps,
  Disclosure as ReactAriaDisclosure,
  type DisclosureProps as ReactAriaDisclosureProps,
} from "react-aria-components";

import { tv } from "tailwind-variants";

const disclosure = tv({
  base: "group",
});

export interface DisclosureProps extends ReactAriaDisclosureProps {
  children: React.ReactNode;
}

export function Disclosure({ children, ...props }: DisclosureProps) {
  return (
    <ReactAriaDisclosure
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        disclosure({ ...renderProps, className }),
      )}
    >
      {children}
    </ReactAriaDisclosure>
  );
}
