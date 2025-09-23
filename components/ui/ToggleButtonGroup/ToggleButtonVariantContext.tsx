"use client";

import { createContext } from "react";
import { ToggleButtonVariant } from "./ToggleButtonGroup";

export const ToggleButtonVariantContext = createContext<
  ToggleButtonVariant | undefined
>(undefined);
