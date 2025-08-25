"use client";

import styles from "./Footer.module.sass";
import Link from "next/link";
import { useTranslations } from "@/lib/translations";
import { buildLocaleHref, getCurrentLocaleFromPath } from "@/utils/localeUtils";
import { usePathname } from "next/navigation";
import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  const t = useTranslations();
  const pathname = usePathname() || "/";
  const currentLocale = getCurrentLocaleFromPath(pathname);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.description}>{t.footerInfo()}</div>
          <div className={styles.title}>Lyudmila zinchenko</div>
          <div className={styles.navElems}>
            <Link href={buildLocaleHref(currentLocale)}>{t.gallery()}</Link>
            <Link href={buildLocaleHref(currentLocale, "about")}>
              {t.about()}
            </Link>
          </div>
        </div>
        <div className={styles.date}>{year}</div>
      </div>
    </footer>
  );
}
