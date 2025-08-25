"use client";

import styles from "./Footer.module.sass";
import Link from "next/link";
import { useTranslations } from "@/lib/translations";

export default function Footer() {
  const year = new Date().getFullYear();
  const t = useTranslations();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.description}>{t.footerInfo()}</div>
          <div className={styles.title}>Lyudmila zinchenko</div>
          <div className={styles.navElems}>
            <Link href="/">{t.gallery()}</Link>
            <Link href="/about">{t.about()}</Link>
          </div>
        </div>
        <div className={styles.date}>{year}</div>
      </div>
    </footer>
  );
}
