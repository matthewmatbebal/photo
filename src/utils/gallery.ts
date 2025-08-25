import { LocalizedWork } from "@/types/work";

/** Мобильный паттерн: [две, одна, одна, две, две] → повтор */
export function getMobilePattern(): Array<"one" | "two"> {
  return ["two", "one", "one", "two", "two"];
}

/** Разбивает список работ на ряды по мобильному паттерну (строго под LocalizedWork). */
export function chunkWorksForMobile(
  works: LocalizedWork[],
): Array<
  | { kind: "one"; items: LocalizedWork[] }
  | { kind: "two"; items: LocalizedWork[] }
> {
  const pattern = getMobilePattern();
  const result: Array<
    | { kind: "one"; items: LocalizedWork[] }
    | { kind: "two"; items: LocalizedWork[] }
  > = [];

  let i = 0;
  let p = 0;

  while (i < works.length) {
    const step = pattern[p % pattern.length];
    if (step === "two") {
      result.push({ kind: "two", items: works.slice(i, i + 2) });
      i += 2;
    } else {
      result.push({ kind: "one", items: works.slice(i, i + 1) });
      i += 1;
    }
    p += 1;
  }
  return result;
}

/** Безопасный заголовок для карточки. */
export function getDisplayTitle(work: LocalizedWork): string {
  return work.title || work.slug || "";
}
