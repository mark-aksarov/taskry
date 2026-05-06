import { ImageProps } from "next/image";
import { twMerge } from "tailwind-merge";
import { Separator } from "@/ui/Separator";
import type { MDXComponents } from "mdx/types";
import { DocsImage } from "@/site/docs/DocsImage";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ className, ...props }) => (
      <h2
        className={twMerge(
          "font-bold max-md:mb-6 max-md:text-3xl md:mb-8 md:text-4xl",
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
      <h4 className={twMerge("mb-6 text-xl font-bold", className)} {...props} />
    ),

    p: ({ className, ...props }) => (
      <p
        className={twMerge("mb-4 text-base/7 font-normal", className)}
        {...props}
      />
    ),

    hr: ({ className }) => (
      <Separator
        className={twMerge(
          "bg-gray-300 max-md:my-8 md:my-10 dark:bg-gray-600",
          className,
        )}
      />
    ),

    ul: ({ className, ...props }) => (
      <ul className={twMerge("mb-6 list-disc pl-5", className)} {...props} />
    ),

    li: ({ className, ...props }) => (
      <li
        className={twMerge("mb-2 text-base/7 font-bold", className)}
        {...props}
      />
    ),

    img: (props) => {
      return <DocsImage {...(props as ImageProps)} />;
    },

    ...components,
  };
}
