"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./Gallery.module.sass";
import { useWorks } from "@/app/api/hooks/useWorks";
import { getImageUrl } from "@/utils/images";
import { useTranslations } from "@/lib/translations";
import { useLocale } from "@/context/LocaleContext";
import { DIRECTUS_LOCALE_MAP } from "@/lib/locale";
import BooksList from "@/components/BooksList/BooksList";
import { LocalizedWork } from "@/types/work";
import { LocalizedBook } from "@/types/book";
import { useIsMobile } from "@/utils/isMobile";
import { chunkWorksForMobile, getDisplayTitle } from "@/utils/gallery";

const DESKTOP_PATTERN = [
  { w: 350, h: 230, align: "left" as const },
  { w: 375, h: 230, align: "right" as const },
  { w: 230, h: 165, align: "left" as const },
  { w: 350, h: 230, align: "left" as const },
  { w: 375, h: 230, align: "right" as const },
] as const;

interface GalleryProps {
  books?: LocalizedBook[];
}

export default function Gallery({ books }: GalleryProps) {
  const { works, loading, hasMore, error, loadMore } = useWorks();
  const t = useTranslations();
  const { locale } = useLocale();
  const dateLocale = DIRECTUS_LOCALE_MAP[locale];
  const isMobile = useIsMobile(768);

  const desktopPrepared = useMemo(() => {
    const withPattern = works.map((work, globalIndex) => ({
      ...work,
      patternItem: DESKTOP_PATTERN[globalIndex % DESKTOP_PATTERN.length],
      globalIndex,
    }));
    return {
      left: withPattern.filter((_, i) => i % 2 === 0),
      right: withPattern.filter((_, i) => i % 2 === 1),
    };
  }, [works]);

  const mobileChunks = useMemo(() => chunkWorksForMobile(works), [works]);

  if (error) {
    return (
      <div className={styles.error}>
        <p>
          {t.error()}: {error}
        </p>
        <button onClick={() => window.location.reload()}>{t.tryAgain()}</button>
      </div>
    );
  }

  function renderItem(
    work: LocalizedWork,
    widthPx?: number,
    heightPx?: number,
    align?: "left" | "right",
  ) {
    const title = getDisplayTitle(work);
    const dateText = work.shoot_date
      ? new Date(work.shoot_date).toLocaleDateString(dateLocale)
      : "";

    const query = widthPx
      ? `width=${widthPx}${heightPx ? `&height=${heightPx}&fit=cover` : ""}&quality=80`
      : `width=720&quality=80`;

    const imageUrl = work.cover_image
      ? getImageUrl(work.cover_image, query)
      : undefined;

    const itemClass = cn(styles.item, {
      [styles.toRight]: align === "right",
      [styles.toLeft]: align !== "right",
      [styles.fallback]: !work.isTranslated,
    });

    return (
      <div key={work.id} className={itemClass}>
        <Link href={`/${locale}/art/${work.slug}`}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              width={widthPx}
              height={heightPx}
              className={styles.image}
              loading="lazy"
            />
          ) : (
            <div className={styles.imagePlaceholder} />
          )}
        </Link>
        <div className={styles.info}>
          <span className={styles.date}>{dateText}</span>
          <span className={styles.title}>{title}</span>
          {!work.isTranslated && (
            <span className={styles.fallbackNote}>EN</span>
          )}
        </div>
      </div>
    );
  }

  function renderDesktop(): React.ReactNode {
    const renderColumn = (
      column: Array<
        LocalizedWork & { patternItem: (typeof DESKTOP_PATTERN)[number] }
      >,
    ) =>
      column.map((work, idx) =>
        renderItem(
          work,
          DESKTOP_PATTERN[idx % DESKTOP_PATTERN.length].w,
          DESKTOP_PATTERN[idx % DESKTOP_PATTERN.length].h,
          DESKTOP_PATTERN[idx % DESKTOP_PATTERN.length].align,
        ),
      );

    return (
      <div className={styles.gallery}>
        <div className={styles.column}>
          {renderColumn(desktopPrepared.left)}
        </div>
        <div className={styles.column}>
          {renderColumn(desktopPrepared.right)}
        </div>
      </div>
    );
  }

  function renderMobile(): React.ReactNode {
    return (
      <div className={styles.mobileGallery}>
        {mobileChunks.map((chunk, rowIdx) => {
          if (chunk.kind === "one") {
            const item = chunk.items[0];
            return (
              <div key={`row-${rowIdx}`} className={styles.rowOne}>
                {item && renderItem(item)}
              </div>
            );
          }
          return (
            <div key={`row-${rowIdx}`} className={styles.rowTwo}>
              {chunk.items.map(
                (item) =>
                  item && (
                    <div key={item.id} className={styles.col}>
                      {renderItem(item)}
                    </div>
                  ),
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      {books && books.length > 0 && (
        <div className={styles.booksSection}>
          <div className={styles.booksContainer}>
            <div className={styles.booksText}>{t.booksText()}</div>
            <BooksList books={books} />
          </div>
        </div>
      )}

      <div className={styles.worksSection}>
        {isMobile ? renderMobile() : renderDesktop()}

        {loading && (
          <div className={styles.loading}>
            <p>{t.loading()}</p>
          </div>
        )}

        {hasMore && !loading && (
          <button className={styles.showMore} onClick={() => void loadMore()}>
            {t.showMore()}
          </button>
        )}
      </div>
    </>
  );
}
