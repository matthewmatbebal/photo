import { notFound } from "next/navigation";
import PageLayout from "@/components/Layout/PageLayout";
import type { Locale } from "@/lib/locale";
import { getBookBySlug } from "@/server/queries/books";
import { BookDetailPage } from "@/components/BookDetail/BookDetail";

interface BookPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug, locale } = await params;
  const book = await getBookBySlug(slug, locale);

  if (!book) notFound();

  return (
    <PageLayout>
      <BookDetailPage book={book} />
    </PageLayout>
  );
}
