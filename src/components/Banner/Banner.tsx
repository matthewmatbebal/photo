// src/components/Banner/Banner.tsx
import styles from "@/components/Banner/Banner.module.sass";
import Image from "next/image";

interface BannerProps {
  title: string;
}

export default function Banner({ title }: BannerProps) {
  return (
    <div className={styles.banner}>
      <Image
        src="/Cover_image.png"
        alt="banner"
        fill
        className={styles.bannerBg}
        priority
      />

      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  );
}
