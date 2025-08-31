import { notFound } from "next/navigation";
import PageLayout from "@/components/Layout/PageLayout";
import WorkDetailPage from "@/components/WorkDetail/WorkDetailPage";
import { getWorkBySlug } from "@/server/queries/getWorksBySlug";
import type { Locale } from "@/lib/locale";

interface WorkPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug, locale } = await params;
  const work = await getWorkBySlug(slug, locale);
  if (!work) notFound();

  return (
    <PageLayout>
      <WorkDetailPage work={work} locale={locale} />
    </PageLayout>
  );
}
