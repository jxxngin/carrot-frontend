import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";

export function normalizeKeyword(value: string | string[] | undefined): string {
  const keyword = Array.isArray(value) ? value[0] : value;

  return (keyword ?? "").trim();
}

export function withProductKeyword(pathname: string, keyword: string): string {
  const normalizedKeyword = normalizeKeyword(keyword);

  if (!normalizeKeyword) {
    return pathname;
  }

  const query = new URLSearchParams({
    keyword: normalizedKeyword,
  });

  return `${pathname}?${query.toString()}`;
}
