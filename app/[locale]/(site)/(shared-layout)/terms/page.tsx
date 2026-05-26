import TermsPage from "./TermsPage";

interface AppDocsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AppTermsPage({ params }: AppDocsPageProps) {
  const { locale } = await params;

  const Content = (await import(`@/markdown/terms.${locale}.mdx`)).default;

  return (
    <TermsPage>
      <Content />
    </TermsPage>
  );
}
