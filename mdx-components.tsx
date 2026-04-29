import { ImageProps } from "next/image";
import { twMerge } from "tailwind-merge";
import { Separator } from "@/ui/Separator";
import type { MDXComponents } from "mdx/types";
import { DocsImage } from "./site/docs/DocsImage";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ className, ...props }) => (
      <h2
        className={twMerge(
          "font-bold max-md:mb-6 max-md:text-4xl md:mb-8 md:text-5xl",
          className,
        )}
        {...props}
      />
    ),

    h3: ({ className, ...props }) => (
      <h3
        className={twMerge(
          "font-bold max-md:mb-6 max-md:text-2xl md:mb-8 md:text-3xl",
          className,
        )}
        {...props}
      />
    ),

    h4: ({ className, ...props }) => (
      <h4
        className={twMerge("text-lg font-bold max-md:mb-4 md:mb-6", className)}
        {...props}
      />
    ),

    p: ({ className, ...props }) => (
      <p
        className={twMerge(
          "font-normal max-md:mb-4 max-md:text-sm/6 md:mb-4 md:text-base/7",
          className,
        )}
        {...props}
      />
    ),

    hr: ({ className }) => (
      <Separator className={twMerge("max-md:my-6 md:my-8", className)} />
    ),

    ul: ({ className, ...props }) => (
      <ul
        className={twMerge(
          "list-disc pl-5 max-md:mb-4 max-md:text-sm md:mb-6 md:text-base",
          className,
        )}
        {...props}
      />
    ),

    li: ({ className, ...props }) => (
      <li
        className={twMerge("font-bold max-md:mb-2 md:mb-2", className)}
        {...props}
      />
    ),

    img: (props) => {
      return <DocsImage {...(props as ImageProps)} />;
    },

    ...components,
  };
}
