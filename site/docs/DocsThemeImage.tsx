"use client";

import { DocsImage } from "@/site/docs/DocsImage";

type ImageSet = {
  light: string;
  dark: string;
};

type Props = {
  imageSet: ImageSet;
  alt?: string;
  size: { width: number; height: number };
};

export function DocsThemeImage({
  imageSet,
  alt = "",
  size = { width: 1240, height: 825 },
}: Props) {
  return (
    <>
      {/* Light */}
      {imageSet.light && (
        <div className="dark:hidden">
          <DocsImage {...size} alt={alt} src={imageSet.light} />
        </div>
      )}

      {/* Dark */}
      {imageSet.dark && (
        <div className="not-dark:hidden">
          <DocsImage {...size} alt={alt} src={imageSet.dark} />
        </div>
      )}
    </>
  );
}
