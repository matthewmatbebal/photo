"use client";

import React, { JSX } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import style from "./Header.module.sass";
import { useTranslations } from "@/lib/translations";
import HeaderDropdownMenu from "@/components/HeaderDropdownMenu/HeaderDropdownMenu";
import {
  getCurrentLocaleFromPath,
  buildLocaleHref,
  renderLocaleSwitcher,
} from "@/utils/localeUtils";

interface HeaderProps {
  className?: string;
  whiteText?: boolean;
}

export default function Header({
  className,
  whiteText,
}: HeaderProps): JSX.Element {
  const pathname = usePathname() || "/";
  const currentLocale = getCurrentLocaleFromPath(pathname);
  const t = useTranslations();

  return (
    <header
      className={classNames(style.header, className, {
        [style.whiteText]: whiteText,
      })}
    >
      <div className={style.headerWrapper}>
        <div className={style.mobileHeader}>
          <Link
            href={buildLocaleHref(currentLocale)}
            className={classNames(style.logo, className, {
              [style.whiteText]: whiteText,
            })}
          >
            Lyudmila Zinchenko
          </Link>

          <HeaderDropdownMenu
            currentLocale={currentLocale}
            pathname={pathname}
            whiteText={whiteText}
          />
        </div>

        <div className={style.desktopHeader}>
          <nav>
            <Link href={buildLocaleHref(currentLocale)}>{t.gallery()}</Link>
            <Link href={buildLocaleHref(currentLocale, "about")}>
              {t.about()}
            </Link>
          </nav>
          <nav className={style.lang}>{renderLocaleSwitcher(pathname)}</nav>
        </div>
      </div>
    </header>
  );
}
