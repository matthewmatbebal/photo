import { getImageUrl } from "@/utils/images";
import styles from "./AboutDetailPage.module.sass";
import { LocalizedAbout } from "@/types/about";
import { DirectusFileMinimal } from "@/types/file";
import { getTranslation } from "@/lib/translations";
import type { Locale } from "@/lib/locale";
import MediaBlock from "@/components/MediaBlock/MediaBlock";

interface Props {
  about: LocalizedAbout;
  locale: Locale;
}

function getCoverUrl(id: string | null): string | undefined {
  return id ? getImageUrl(id) : undefined;
}

function getFileUrl(file: DirectusFileMinimal | null): string | undefined {
  return file?.id ? getImageUrl(file.id) : undefined;
}

function getAlt(file: DirectusFileMinimal | null): string {
  return file?.title ?? "";
}

export default function AboutDetailPage({ about, locale }: Props) {
  const coverSrc = getCoverUrl(about.cover_image);
  const media = about.media_items ?? [];
  const [firstImage, secondImage] = media;

  const linksLabel = getTranslation("links", locale);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Мобильная колонка */}
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

          {media.length > 0 && (
            <div className={styles.sliderWrap}>
              <MediaBlock items={media} />
            </div>
          )}

          {about.content && (
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: about.content }}
            />
          )}

          {about.links && about.links.length > 0 && (
            <div className={styles.sourcesSection}>
              <div className={styles.sourcesTitle}>{linksLabel}</div>{" "}
              {/* CHANGED */}
              <ul className={styles.sourcesList}>
                {about.links.map((link) => (
                  <li key={link.id} className={styles.sourceItem}>
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.sourceLink}
                    >
                      {link.link}
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
                  src={getFileUrl(firstImage)}
                  alt={getAlt(firstImage)}
                  className={styles.image}
                  loading="lazy"
                />
                {firstImage.description && (
                  <p className={styles.caption}>{firstImage.description}</p>
                )}
              </div>
            )}

            {about.links && about.links.length > 0 && (
              <div className={styles.sourcesSection}>
                <div className={styles.sourcesTitle}>{linksLabel}</div>{" "}
                {/* CHANGED */}
                <div className={styles.sourcesList}>
                  {about.links.map((link) => (
                    <div key={link.id} className={styles.sourceItem}>
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.sourceLink}
                      >
                        {link.link}
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
                  src={getFileUrl(secondImage)}
                  alt={getAlt(secondImage)}
                  className={styles.image}
                  loading="lazy"
                />
                {secondImage.description && (
                  <p className={styles.caption}>{secondImage.description}</p>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
