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

  return Number.isSafeInteger(page) && page <= 2147483647 ? page : 1;
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
