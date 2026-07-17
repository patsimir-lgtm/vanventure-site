const INDEX_PATH = "/index.html";

function withHeaders(response) {
  const headers = new Headers(response.headers);
  headers.set("x-content-type-options", "nosniff");
  headers.set("cache-control", "public, max-age=300");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function fetchAsset(env, request, pathname) {
  const assetUrl = new URL(request.url);
  assetUrl.pathname = pathname;
  assetUrl.search = "";
  const response = await env.ASSETS.fetch(new Request(assetUrl, request));
  return response.status === 404 ? null : response;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = decodeURIComponent(url.pathname);

    if (pathname === "/" || pathname === "") {
      pathname = INDEX_PATH;
    }

    const candidates = [pathname];
    if (pathname.endsWith("/")) {
      candidates.push(`${pathname}index.html`);
    }
    if (!pathname.split("/").pop().includes(".")) {
      candidates.push(`${pathname}.html`, `${pathname}/index.html`);
    }

    for (const candidate of candidates) {
      const response = await fetchAsset(env, request, candidate);
      if (response) {
        return withHeaders(response);
      }
    }

    const fallback = await fetchAsset(env, request, INDEX_PATH);
    return fallback ? withHeaders(fallback) : new Response("Not found", { status: 404 });
  },
};

