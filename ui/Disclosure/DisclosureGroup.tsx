"use client";

import React from "react";
import {
  DisclosureGroup as ReactAriaDisclosureGroup,
  type DisclosureGroupProps as ReactAriaDisclosureGroupProps,
} from "react-aria-components";

export interface DisclosureGroupProps extends ReactAriaDisclosureGroupProps {
  children: React.ReactNode;
}

export function DisclosureGroup({ children, ...props }: DisclosureGroupProps) {
  return (
    <ReactAriaDisclosureGroup {...props}>{children}</ReactAriaDisclosureGroup>
  );
}
