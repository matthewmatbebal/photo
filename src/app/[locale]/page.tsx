// src/app/[locale]/page.tsx (или где вы используете Gallery)
import PageLayout from "@/components/Layout/PageLayout";
import Gallery from "@/components/Gallery/Gallery";
import { getBooks } from "@/server/queries/books";
import type { Locale } from "@/lib/locale";
import Banner from "@/components/Banner/Banner";

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const books = await getBooks(locale);

  return (
    <PageLayout headerWhiteText>
      <Banner title={"Lyudmila Zinchenko"} />
      <Gallery books={books} />
    </PageLayout>
  );
}
