// src/components/WorkDetail/WorkDetailPage.tsx
import styles from "./WorkDetailPage.module.sass";
import { LocalizedWork } from "@/types/work";
import { DIRECTUS_LOCALE_MAP, Locale } from "@/lib/locale";
import MediaBlock from "@/components/MediaBlock/MediaBlock";

interface Props {
  work: LocalizedWork;
  locale: Locale;
}

function formatShootDate(
  dateISO: string | null | undefined,
  locale: Locale,
): string {
  const code = DIRECTUS_LOCALE_MAP[locale];
  if (!dateISO) return "";
  const d = new Date(dateISO);
  return isNaN(d.getTime()) ? "" : d.toLocaleDateString(code);
}

export default function WorkDetailPage({ work, locale }: Props) {
  const dateText = formatShootDate(work.shoot_date, locale);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>{work.title}</div>

        {work.description ? (
          <div
            className={styles.textContainer}
            dangerouslySetInnerHTML={{ __html: work.description }}
          />
        ) : dateText ? (
          <div className={styles.shootDate}>{dateText}</div>
        ) : null}
      </div>

      <div className={styles.slider}>
        <MediaBlock items={work.media_items || []} />
      </div>
    </div>
  );
}
