import { notFound } from "next/navigation";
import { DocsPage } from "./DocsPage";

interface Props {
  params: Promise<{ slug?: string[]; locale: string }>;
}

export default async function AppDocsPage({ params }: Props) {
  const { slug, locale } = await params;

  let Content;

  try {
    if (!slug) {
      Content = (await import(`@/markdown/index.${locale}.mdx`)).default;
    } else if (slug.length === 1) {
      const [section] = slug;
      Content = (await import(`@/markdown/${section}/index.${locale}.mdx`))
        .default;
    } else if (slug.length === 2) {
      const [section, page] = slug;
      Content = (await import(`@/markdown/${section}/${page}.${locale}.mdx`))
        .default;
    } else {
      notFound();
    }
  } catch {
    notFound();
  }

  return (
    <DocsPage>
      <Content />
    </DocsPage>
  );
}
