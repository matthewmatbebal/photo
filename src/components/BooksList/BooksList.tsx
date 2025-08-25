// src/components/BooksList/BooksList.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./BooksList.module.sass";
import { getImageUrl } from "@/utils/images";
import { useLocale } from "@/context/LocaleContext";
import { LocalizedBook } from "@/types/book";
import { useTranslations } from "@/lib/translations";

interface BooksListProps {
  books: LocalizedBook[];
}

function getDisplayTitle(book: LocalizedBook): string {
  return book.title || book.slug || "";
}

export default function BooksList({ books }: BooksListProps) {
  const { locale } = useLocale();
  const [isMobile, setIsMobile] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const displayBooks =
    books.length === 1 ? [books[0], books[0], books[0]] : books;

  const renderBookItem = (book: LocalizedBook, index: number) => {
    const imageUrl = book.cover_image
      ? getImageUrl(
          book.cover_image,
          "width=191&height=255&fit=cover&quality=80",
        )
      : undefined;

    const title = getDisplayTitle(book);
    const key = books.length === 1 ? `${book.id}-${index}` : book.id;

    return (
      <div
        key={key}
        className={`${styles.bookItem} ${!book.isTranslated ? styles.fallback : ""}`}
      >
        <Link href={`/${locale}/books/${book.slug}`}>
          <div className={styles.bookCover}>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className={styles.coverImage}
                loading="lazy"
              />
            ) : (
              <div className={styles.coverPlaceholder}>
                <span>{title}</span>
              </div>
            )}
          </div>
        </Link>

        <div className={styles.bookInfo}>
          <div className={styles.bookTitle}>{title}</div>

          {book.description && (
            <div className={styles.bookDescription}>{book.description}</div>
          )}
          <div className={styles.readMore}>
            <Link href={`/${locale}/books/${book.slug}`}>{t.readMore()}</Link>
          </div>
        </div>
      </div>
    );
  };

  // На десктопе - обычный флекс
  if (!isMobile) {
    return (
      <div className={styles.booksContainer}>
        <div className={styles.booksList}>
          {displayBooks.map((book, index) => renderBookItem(book, index))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.booksContainer}>
      <div className={styles.mobileSlider}>
        <Swiper
          modules={[Pagination]}
          spaceBetween={2}
          slidesPerView={1.02}
          pagination={{
            clickable: true,
            bulletClass: styles.paginationDot,
            bulletActiveClass: styles.active,
            el: `.${styles.pagination}`,
          }}
          className={styles.swiper}
        >
          {displayBooks.map((book, index) => (
            <SwiperSlide
              key={books.length === 1 ? `${book.id}-${index}` : book.id}
            >
              {renderBookItem(book, index)}
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.pagination}></div>
      </div>
    </div>
  );
}
