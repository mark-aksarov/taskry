"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function BackButton({ href }: { href: string }) {
  return (
    <Button
      as="a"
      href={href}
      variant="outlined"
      iconLeft={<ChevronLeft size={16} absoluteStrokeWidth strokeWidth={1.5} />}
    />
  );
}
