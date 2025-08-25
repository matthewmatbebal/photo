//src/lib/translations.ts

import { DIRECTUS_LOCALE_MAP, Locale } from "./locale";
import { useLocale } from "@/context/LocaleContext";
import { Book, BookTranslation, LocalizedBook } from "@/types/book";

interface TranslationSet {
  en: string;
  ru: string;
  fr: string;
}

interface Translations {
  // Gallery
  loading: TranslationSet;
  showMore: TranslationSet;
  tryAgain: TranslationSet;
  error: TranslationSet;

  // Navigation
  gallery: TranslationSet;
  about: TranslationSet;

  // Work details
  backToGallery: TranslationSet;

  // Dates
  shootDate: TranslationSet;

  //books
  booksText: TranslationSet;
  readMore: TranslationSet;
  links: TranslationSet;
  footerInfo: TranslationSet;
}

export const translations: Translations = {
  // Gallery
  loading: {
    en: "Loading…",
    ru: "Загрузка…",
    fr: "Chargement…",
  },
  showMore: {
    en: "Show more",
    ru: "Показать ещё",
    fr: "Voir plus",
  },
  tryAgain: {
    en: "Try again",
    ru: "Попробовать снова",
    fr: "Réessayer",
  },
  error: {
    en: "Error",
    ru: "Ошибка",
    fr: "Erreur",
  },
  // Navigation
  gallery: {
    en: "Gallery",
    ru: "Галерея",
    fr: "Galerie",
  },
  about: {
    en: "About me",
    ru: "Обо мне",
    fr: "À propos de moi",
  },
  // Work details
  backToGallery: {
    en: "Back to Gallery",
    ru: "Назад к галерее",
    fr: "Retour à la galerie",
  },
  // Dates
  shootDate: {
    en: "Shot on",
    ru: "Снято",
    fr: "Prise le",
  },
  booksText: {
    en: "How to explain first to myself what am I doing? Am I shooting the life? Am I watching the life? Thinking about life? We can try all the forms of language, use all the cameras, open up the language of new media, but say nothing new about life. Because the life itsself is not about life…",
    ru: "Как объяснить себе, что я делаю? Снимаю ли я жизнь? Наблюдаю ли я за жизнью? Думаю ли я о жизни? Мы можем перепробовать все формы языка, использовать все камеры, открыть язык новых медиа, но не сказать ничего нового о жизни. Потому что сама жизнь — это не жизнь…",
    fr: "Comment m'expliquer d'abord ce que je fais ? Est-ce que je photographie la vie ? Est-ce que je la regarde ? Est-ce que je réfléchis à la vie ? On peut essayer toutes les formes de langage, utiliser tous les appareils photo, ouvrir le langage des nouveaux médias, mais rien de nouveau sur la vie. Car la vie elle-même n'est pas la vie…",
  },
  readMore: {
    en: "Read More",
    ru: "Читать",
    fr: "Savoir Plus",
  },
  links: {
    en: "Links",
    ru: "Ссылки",
    fr: "Liens",
  },
  footerInfo: {
    en: "Photographer. Filmmaker. Writer.",
    ru: "Фотограф. Кинорежиссер. Писатель.",
    fr: "Photographe. Réalisateur. Écrivain.",
  },
};

export function getTranslation(
  key: keyof Translations,
  locale: Locale,
): string {
  return translations[key][locale];
}

export function useTranslations() {
  const { locale } = useLocale();

  return {
    loading: () => getTranslation("loading", locale),
    showMore: () => getTranslation("showMore", locale),
    tryAgain: () => getTranslation("tryAgain", locale),
    error: () => getTranslation("error", locale),
    gallery: () => getTranslation("gallery", locale),
    about: () => getTranslation("about", locale),
    backToGallery: () => getTranslation("backToGallery", locale),
    shootDate: () => getTranslation("shootDate", locale),
    booksText: () => getTranslation("booksText", locale),
    readMore: () => getTranslation("readMore", locale),
    links: () => getTranslation("links", locale),
    footerInfo: () => getTranslation("footerInfo", locale),
    locale,
  };
}

export function withTranslation(book: Book, locale: Locale): LocalizedBook {
  if (!book.translations?.length) {
    return {
      id: book.id,
      status: book.status,
      slug: book.slug,
      title: book.title,
      description: book.description,
      content: book.content,
      cover_image: book.cover_image,
      isTranslated: false,
    };
  }

  const directusLocale = DIRECTUS_LOCALE_MAP[locale];
  const translation = book.translations.find(
    (t: BookTranslation) => t.languages_code === directusLocale,
  );

  if (!translation) {
    return {
      id: book.id,
      status: book.status,
      slug: book.slug,
      title: book.title,
      description: book.description,
      content: book.content,
      cover_image: book.cover_image,
      isTranslated: false,
    };
  }

  return {
    id: book.id,
    status: book.status,
    slug: book.slug,
    title: translation.title || book.title,
    description: translation.description || book.description,
    content: book.content,
    cover_image: book.cover_image,
    isTranslated: true,
  };
}
