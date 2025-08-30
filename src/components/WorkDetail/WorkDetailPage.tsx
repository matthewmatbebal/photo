// src/components/WorkDetail/WorkDetailPage.tsx
"use client";

import MediaSlider from "@/components/MediaSlider/MediaSlider";
import styles from "./WorkDetailPage.module.sass";
import { LocalizedWork } from "@/types/work";
import { DIRECTUS_LOCALE_MAP } from "@/lib/locale";
import { useLocale } from "@/context/LocaleContext";

interface Props {
  work: LocalizedWork;
}

export default function WorkDetailPage({ work }: Props) {
  const { locale } = useLocale();
  const dateLocale = DIRECTUS_LOCALE_MAP[locale];
  const dateText = work.shoot_date
    ? new Date(work.shoot_date).toLocaleDateString(dateLocale)
    : "";

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>{work.title}</div>
        {work.description ? (
          <div
            className={styles.textContainer}
            dangerouslySetInnerHTML={{ __html: work.description }}
          />
        ) : work.shoot_date ? (
          <div className={styles.shootDate}>{dateText}</div>
        ) : null}
      </div>
      <div className={styles.slider}>
        <MediaSlider items={work.media_items || []} />
      </div>
    </div>
  );
}
