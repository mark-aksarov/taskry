import PrivacyPolicyPage from "./PrivacyPolicyPage";

interface AppDocsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AppPrivacyPolicyPage({
  params,
}: AppDocsPageProps) {
  const { locale } = await params;

  const Content = (await import(`@/markdown/privacy-policy.${locale}.mdx`))
    .default;

  return (
    <PrivacyPolicyPage>
      <Content />
    </PrivacyPolicyPage>
  );
}
