"use client";

import React, { JSX, useState, useEffect } from "react";
import Link from "next/link";
import classNames from "classnames";
import style from "./HeaderDropdownMenu.module.sass";
import { Locale, LOCALES } from "@/lib/locale";
import { useTranslations } from "@/lib/translations";
import { swapLocaleInPath, buildLocaleHref } from "@/utils/localeUtils";
import OpenSvg from "@/assets/icons/icon-burger.svg";
import CloseSvg from "@/assets/icons/icon-close.svg";

interface HeaderDropdownMenuProps {
  currentLocale: Locale;
  pathname: string;
  whiteText?: boolean;
}

export default function HeaderDropdownMenu({
  currentLocale,
  pathname,
  whiteText = false,
}: HeaderDropdownMenuProps): JSX.Element {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  function handleToggle(): void {
    setIsOpen((prev) => !prev);
  }

  function handleClose(): void {
    setIsOpen(false);
  }

  return (
    <>
      {!isOpen && (
        <OpenSvg
          className={classNames(style.menuButton, {
            [style.whiteText]: whiteText,
          })}
          onClick={handleToggle}
        />
      )}

      <div
        className={classNames(style.dropdown, {
          [style.open]: isOpen,
        })}
      >
        {isOpen && (
          <>
            <div className={style.header}>
              <div className={style.title}>Lyudmila Zinchenko</div>
              <CloseSvg onClick={handleClose} className={style.closeButton} />
            </div>

            <nav className={style.navigation}>
              <Link
                href={buildLocaleHref(currentLocale)}
                onClick={handleClose}
                className={style.navLink}
              >
                {t.gallery()}
              </Link>
              <Link
                href={buildLocaleHref(currentLocale, "about")}
                onClick={handleClose}
                className={style.navLink}
              >
                {t.about()}
              </Link>
            </nav>

            <div className={style.languageSwitcher}>
              {LOCALES.map((l, i) => (
                <React.Fragment key={`locale-${l}`}>
                  <Link
                    href={swapLocaleInPath(pathname, l)}
                    onClick={handleClose}
                    className={style.langLink}
                  >
                    {l.toUpperCase()}
                  </Link>
                  {i < LOCALES.length - 1 ? (
                    <span aria-hidden="true">/</span>
                  ) : null}
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
