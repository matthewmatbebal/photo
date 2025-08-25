// src/components/Banner/Banner.tsx
import styles from "@/components/Banner/Banner.module.sass";
import Image from "next/image";

interface BannerProps {
  title: string;
}

export default function Banner({ title }: BannerProps) {
  return (
    <div className={styles.banner}>
      {/* Фоновое изображение на весь экран */}
      <Image
        src="/Cover_image.png"
        alt="banner"
        fill
        className={styles.bannerBg}
        priority
      />

      {/* Контент поверх изображения */}
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  );
}
