// src/components/MediaSlider/MediaSlider.tsx
"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { getImageUrl } from "@/utils/images";
import { DirectusFileMinimal } from "@/types/file";
import styles from "./MediaSlider.module.sass";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Props {
  items: DirectusFileMinimal[];
}

function getFileId(file?: DirectusFileMinimal | null): string | null {
  return file?.id ?? null;
}

function isVideoFile(file?: DirectusFileMinimal | null): boolean {
  const t = file?.type ?? "";
  return typeof t === "string" && t.startsWith("video/");
}

function getAltText(file?: DirectusFileMinimal | null): string {
  return file?.title ?? "";
}

function getPreviewUrl(
  file: DirectusFileMinimal,
  w: number,
  h?: number,
): string | null {
  const id = getFileId(file);
  if (!id) return null;
  const params = h
    ? `width=${w}&height=${h}&fit=cover&quality=80`
    : `width=${w}&quality=90`;
  return getImageUrl(id, params);
}

function getOriginalUrl(file: DirectusFileMinimal): string | null {
  const id = getFileId(file);
  return id ? getImageUrl(id) : null;
}

export default function MediaSlider({ items }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (!items || items.length === 0) return null;

  const videoItem = items.find((f) => isVideoFile(f));
  if (videoItem) {
    const videoSrc = getOriginalUrl(videoItem) ?? undefined;
    return (
      <div className={styles.mediaSlider}>
        <div className={styles.videoContainer}>
          <video
            src={videoSrc}
            controls
            className={styles.mediaItem}
            preload="metadata"
          />
        </div>
      </div>
    );
  }

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentIndex(swiper.activeIndex);
  };

  return (
    <div className={styles.mediaSlider}>
      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        navigation={items.length > 1}
        pagination={{
          el: `.${styles.customPagination}`,
          clickable: true,
          bulletClass: styles.paginationBullet,
          bulletActiveClass: styles.paginationBulletActive,
        }}
        keyboard={{ enabled: true }}
        loop={false}
        spaceBetween={5}
        slidesPerView={1.03}
        onSlideChange={handleSlideChange}
        className={styles.mediaSwiper}
        breakpoints={{
          900: { slidesPerView: 1.1, spaceBetween: 16, pagination: false },
        }}
      >
        {items.map((file) => {
          const src = getPreviewUrl(file, 1200);
          return (
            <SwiperSlide key={file.id}>
              <div className={styles.slide}>
                <img
                  src={src ?? undefined}
                  alt={getAltText(file)}
                  className={styles.mediaItem}
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {items.length > 1 && (
        <>
          <div className={styles.customPagination} />
          <div className={styles.slideCounter}>
            {currentIndex + 1}/{items.length}
          </div>
        </>
      )}
    </div>
  );
}
