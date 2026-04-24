"use client";

import {
  type LinkProps,
  composeRenderProps,
  type BreadcrumbProps,
  type BreadcrumbsProps,
  Breadcrumb as AriaBreadcrumb,
  Breadcrumbs as AriaBreadcrumbs,
} from "react-aria-components";

import React from "react";
import { tv } from "tailwind-variants";
import { BaseLink } from "../Link";
import { twMerge } from "tailwind-merge";

export function Breadcrumbs<T extends object>(props: BreadcrumbsProps<T>) {
  return (
    <AriaBreadcrumbs
      {...props}
      className={twMerge("flex gap-2", props.className)}
    />
  );
}

const breadcrumbStyle = tv({
  base: "flex items-center gap-2 text-sm font-normal",

  variants: {
    isCurrent: {
      false: "text-slate-600 dark:text-slate-300",
    },
    isDisabled: {
      true: "text-black dark:text-white",
    },
  },
});

export function Breadcrumb(
  props: BreadcrumbProps & Omit<LinkProps, "className">,
) {
  return (
    <AriaBreadcrumb
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        breadcrumbStyle({ ...renderProps, className }),
      )}
    >
      {({ isCurrent }) => (
        <>
          <BaseLink {...props} />
          {!isCurrent && "/"}
        </>
      )}
    </AriaBreadcrumb>
  );
}
