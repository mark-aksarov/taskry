import { twMerge } from "tailwind-merge";
import { Separator } from "@/ui/Separator";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ className, ...props }) => (
      <h2
        className={twMerge(
          "font-bold max-md:mt-6 max-md:text-4xl md:mt-8 md:text-5xl",
          className,
        )}
        {...props}
      />
    ),

    h3: ({ className, ...props }) => (
      <h3
        className={twMerge(
          "font-bold max-md:mt-6 max-md:text-2xl md:mt-8 md:text-3xl",
          className,
        )}
        {...props}
      />
    ),

    h4: ({ className, ...props }) => (
      <h4
        className={twMerge(
          "text-lg font-semibold max-md:mt-4 md:mt-4",
          className,
        )}
        {...props}
      />
    ),

    p: ({ className, ...props }) => (
      <p
        className={twMerge(
          "font-normal max-md:mt-4 max-md:text-sm md:mt-4 md:text-base",
          className,
        )}
        {...props}
      />
    ),

    hr: ({ className }) => (
      <Separator className={twMerge("max-md:mt-6 md:mt-8", className)} />
    ),

    Separator,

    ...components,
  };
}
