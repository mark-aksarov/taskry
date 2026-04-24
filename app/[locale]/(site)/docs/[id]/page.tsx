import { DocsPage } from "./DocsPage";

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export default async function AppDocsPage({ params }: Props) {
  const { id, locale } = await params;

  const Content = (await import(`@/markdown/${id}.${locale}.mdx`)).default;

  return (
    <DocsPage>
      <Content />
    </DocsPage>
  );
}
