//src/app/api/hooks/useWorks.ts

"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { readItems } from "@directus/sdk";
import { directus } from "@/lib/directus";
import { useLocale } from "@/context/LocaleContext";
import { Locale } from "@/lib/locale";
import { withTranslation } from "@/utils/workTranslation";

const LIMIT = 10;

async function fetchWorksByLocale({
  pageParam = 0,
  locale,
}: {
  pageParam: number;
  locale: Locale;
}) {
  const rows = await directus.request(
    readItems("works", {
      limit: LIMIT,
      offset: pageParam * LIMIT,
      fields: [
        "id",
        "title",
        "slug",
        "shoot_date",
        "cover_image",
        {
          translations: ["id", "title", "languages_code"],
        },
      ],
    }),
  );

  return rows.map((work) => withTranslation(work, locale));
}

export function useWorks() {
  const { locale } = useLocale();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["works", locale],
    queryFn: ({ pageParam }) => fetchWorksByLocale({ pageParam, locale }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === LIMIT ? allPages.length : undefined,
    initialPageParam: 0,
  });

  const works = data?.pages.flat() ?? [];

  return {
    works,
    loading: isFetching && !isFetchingNextPage,
    error: (error as Error | undefined)?.message ?? null,
    hasMore: hasNextPage,
    loadMore: fetchNextPage,
    refresh: refetch,
    loadingMore: isFetchingNextPage,
  };
}
