import { DocsPage } from "./DocsPage";

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function AppDocsPage({ children, params }: Props) {
  const { locale } = await params;

  return <DocsPage />;
}
