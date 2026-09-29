import { JAVA_INT_MAX } from "./number-limits";

const MAX_API_PAGE_INDEX = JAVA_INT_MAX;
const MAX_UI_PAGE_NUMBER = MAX_API_PAGE_INDEX + 1;

export function normalizeKeyword(value: string | string[] | undefined): string {
  const keyword = Array.isArray(value) ? value[0] : value;

  return (keyword ?? "").trim();
}

export function normalizePage(value: string | string[] | undefined): number {
  const rawPage = Array.isArray(value) ? value[0] : value;

  if (!rawPage || !/^[1-9]\d*$/.test(rawPage)) {
    return 1;
  }

  const page = Number(rawPage);

  if (!Number.isSafeInteger(page) || page > MAX_UI_PAGE_NUMBER) {
    return 1;
  }

  return page;
}

export function withProductKeyword(pathname: string, keyword: string): string {
  const normalizedKeyword = normalizeKeyword(keyword);

  if (!normalizedKeyword) {
    return pathname;
  }

  const query = new URLSearchParams({
    keyword: normalizedKeyword,
  });

  return `${pathname}?${query.toString()}`;
}
