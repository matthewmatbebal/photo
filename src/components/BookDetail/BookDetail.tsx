// src/components/BookDetail/BookDetail.tsx
"use client";

import React from "react";
import styles from "./BookDetail.module.sass";
import { getImageUrl } from "@/utils/images";
import { LocalizedBook } from "@/types/book";

interface BookDetailPageProps {
  book: LocalizedBook;
}

export function BookDetailPage({ book }: BookDetailPageProps) {
  const imageUrl = book.cover_image
    ? getImageUrl(book.cover_image, "width=400&height=600&fit=cover&quality=90")
    : undefined;

  return (
    <div className={styles.bookDetail}>
      <div className={styles.mobileTitle}>
        <div className={styles.bookTitle}>{book.title}</div>
      </div>

      <div className={styles.bookHeader}>
        <div className={styles.bookCover}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={book.title}
              className={styles.coverImage}
            />
          ) : (
            <div className={styles.coverPlaceholder}>
              <span>{book.title}</span>
            </div>
          )}
        </div>

        <div className={styles.bookInfo}>
          <div className={styles.desktopTitle}>
            <div className={styles.bookTitle}>{book.title}</div>
          </div>

          {book.description && (
            <div className={styles.bookDescription}>{book.description}</div>
          )}
        </div>
      </div>

      {book.content && (
        <div className={styles.bookContent}>
          <div
            className={styles.contentText}
            dangerouslySetInnerHTML={{ __html: book.content }}
          />
        </div>
      )}
    </div>
  );
}
