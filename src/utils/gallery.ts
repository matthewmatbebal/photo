import { LocalizedWork } from "@/types/work";

export function getMobilePattern(): Array<
  "two-big-small" | "two-small-big" | "one"
> {
  return ["two-big-small", "two-small-big", "one"];
}

export function chunkWorksForMobile(
  works: LocalizedWork[],
): Array<
  | { kind: "one"; items: LocalizedWork[] }
  | { kind: "two-big-small"; items: LocalizedWork[] }
  | { kind: "two-small-big"; items: LocalizedWork[] }
> {
  const pattern = getMobilePattern();
  const result: Array<
    | { kind: "one"; items: LocalizedWork[] }
    | { kind: "two-big-small"; items: LocalizedWork[] }
    | { kind: "two-small-big"; items: LocalizedWork[] }
  > = [];

  let i = 0;
  let p = 0;

  while (i < works.length) {
    const step = pattern[p % pattern.length];
    if (step === "two-big-small" || step === "two-small-big") {
      result.push({ kind: step, items: works.slice(i, i + 2) });
      i += 2;
    } else {
      result.push({ kind: "one", items: works.slice(i, i + 1) });
      i += 1;
    }
    p += 1;
  }
  return result;
}

export function getDisplayTitle(work: LocalizedWork): string {
  return work.title || work.slug || "";
}
