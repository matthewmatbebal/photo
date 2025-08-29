"use client";

import { getImageUrl } from "@/utils/images";
import MediaSlider from "@/components/MediaSlider/MediaSlider";
import styles from "./AboutDetailPage.module.sass";
import { LocalizedAbout } from "@/types/about";
import { MediaItem } from "@/types/mediaItem";
import { useTranslations } from "@/lib/translations";

interface FileRefObject {
  id: string;
  type?: string | null;
}
type FileRef = string | FileRefObject | null;

interface Props {
  about: LocalizedAbout;
}

function getFileId(file: FileRef): string | null {
  if (!file) return null;
  return typeof file === "string" ? file : (file.id ?? null);
}

function getOriginalUrl(file: FileRef | string | null): string | null {
  if (!file) return null;
  if (typeof file === "string") return getImageUrl(file);
  const id = getFileId(file);
  return id ? getImageUrl(id) : null;
}

function getAltText(item: MediaItem): string {
  return item.caption ?? "";
}

export default function AboutDetailPage({ about }: Props) {
  const coverSrc = getOriginalUrl(about.cover_image ?? null);
  const mediaItems = (about.media_items ?? []).slice(0, 2); // работаем только с первыми двумя изображениями
  const firstImage = mediaItems[0] ?? null;
  const secondImage = mediaItems[1] ?? null;
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.mobileLayout}>
          {coverSrc && (
            <div className={styles.coverBlock}>
              <img
                src={coverSrc}
                alt={about.title}
                className={styles.coverImage}
                loading="lazy"
              />
            </div>
          )}

          <div className={styles.title}>{about.title}</div>

          {about.description && (
            <div className={styles.descriptionPlain}>{about.description}</div>
          )}

          {mediaItems.length > 0 && (
            <div className={styles.sliderWrap}>
              <MediaSlider items={mediaItems} />
            </div>
          )}

          {about.content && (
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: about.content }}
            />
          )}

          {about.sources && about.sources.length > 0 && (
            <div className={styles.sourcesSection}>
              <div className={styles.sourcesTitle}>{t.links()}</div>
              <ul className={styles.sourcesList}>
                {about.sources.map((source) => (
                  <li key={source.id} className={styles.sourceItem}>
                    <a
                      href={source.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.sourceLink}
                    >
                      {source.link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.desktopLayout}>
          <section className={`${styles.block} ${styles.blockTop}`}>
            {firstImage && (
              <div className={styles.imageBlock}>
                <img
                  src={getOriginalUrl(firstImage.file) ?? undefined}
                  alt={getAltText(firstImage)}
                  className={styles.image}
                  loading="lazy"
                />
                {firstImage.caption && (
                  <p className={styles.caption}>{firstImage.caption}</p>
                )}
              </div>
            )}

            {about.sources && about.sources.length > 0 && (
              <div className={styles.sourcesSection}>
                <div className={styles.sourcesTitle}>{t.links()}</div>
                <div className={styles.sourcesList}>
                  {about.sources.map((source) => (
                    <div key={source.id} className={styles.sourceItem}>
                      <a
                        href={source.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.sourceLink}
                      >
                        {source.link}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className={`${styles.block} ${styles.blockMiddle}`}>
            <div className={styles.title}>{about.title}</div>

            {about.description && (
              <div className={styles.descriptionPlain}>{about.description}</div>
            )}

            {about.content && (
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: about.content }}
              />
            )}
          </section>

          <section className={`${styles.block} ${styles.blockBottom}`}>
            {secondImage && (
              <div className={styles.imageBlock}>
                <img
                  src={getOriginalUrl(secondImage.file) ?? undefined}
                  alt={getAltText(secondImage)}
                  className={styles.image}
                  loading="lazy"
                />
                {secondImage.caption && (
                  <p className={styles.caption}>{secondImage.caption}</p>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
