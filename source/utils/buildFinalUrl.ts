export function buildFinalUrl(
  baseURL: string,
  url: string,
  queryParams: Record<string, string>,
): string {
  let finalUrl = baseURL ? new URL(url, baseURL).toString() : url;
  const urlObj = new URL(finalUrl);
  Object.keys(queryParams).forEach((key) =>
    urlObj.searchParams.append(key, queryParams[key]),
  );
  return urlObj.toString();
}
