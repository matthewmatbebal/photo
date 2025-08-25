"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { getImageUrl } from "@/utils/images";
import styles from "./MediaSlider.module.sass";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface FileRefObject {
  id: string;
  type?: string | null;
}
type FileRef = string | FileRefObject | null;

export interface MediaItem {
  id: number;
  caption?: string | null;
  file: FileRef;
}

interface Props {
  items: MediaItem[];
}

function getFileId(file: FileRef): string | null {
  if (!file) return null;
  return typeof file === "string" ? file : (file.id ?? null);
}

function isVideoFile(file: FileRef): boolean {
  if (!file) return false;
  if (typeof file === "string") return false;
  const t = file.type ?? "";
  return typeof t === "string" && t.startsWith("video/");
}

function getAltText(item: MediaItem): string {
  return item.caption ?? "";
}

function getPreviewUrl(file: FileRef, w: number, h?: number): string | null {
  const id = getFileId(file);
  if (!id) return null;
  const params = h
    ? `width=${w}&height=${h}&fit=cover&quality=80`
    : `width=${w}&quality=90`;
  return getImageUrl(id, params);
}

function getOriginalUrl(file: FileRef): string | null {
  const id = getFileId(file);
  return id ? getImageUrl(id) : null;
}

export default function MediaSlider({ items }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const hasVideo = items.some((item) => isVideoFile(item.file));

  if (hasVideo) {
    const videoItem = items.find((item) => isVideoFile(item.file))!;
    const videoSrc = getOriginalUrl(videoItem.file);

    return (
      <div className={styles.mediaSlider}>
        <div className={styles.videoContainer}>
          <video
            src={videoSrc ?? undefined}
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
          900: {
            slidesPerView: 1.1,
            spaceBetween: 16,
            pagination: false,
          },
        }}
      >
        {items.map((item) => {
          const src = getPreviewUrl(item.file, 1200);

          return (
            <SwiperSlide key={item.id}>
              <div className={styles.slide}>
                <img
                  src={src ?? undefined}
                  alt={getAltText(item)}
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
