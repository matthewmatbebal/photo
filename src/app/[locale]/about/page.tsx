import { notFound } from "next/navigation";
import PageLayout from "@/components/Layout/PageLayout";
import AboutDetailPage from "@/components/About/AboutDetailPage";
import { getAbout } from "@/server/queries/getAbout";
import type { Locale } from "@/lib/locale";

interface AboutPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const about = await getAbout(locale);

  if (!about) notFound();

  return (
    <PageLayout>
      <AboutDetailPage about={about} />
    </PageLayout>
  );
}
