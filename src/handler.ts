import flourite from "flourite";

export async function handleRequest(request: Request): Promise<Response> {
  const accept = request.headers.get("Accept") || "text/plain";
  const body = await request.text();
  if (body.length === 0) {
    return new Response("Body is empty", {
      status: 400,
      headers: {
        "Content-Type": "text/plain"
      }
    });
  }
  const query = new URL(request.url).searchParams;
  const shiki = Boolean(query.get("shiki")) || false;
  const statistics = Boolean(query.get("statistics")) || false;

  const result = flourite(body, { shiki });

  const resStatistics = statistics ? { statistics: result.statistics } : {};

  switch (accept) {
    case "application/json":
      return new Response(
        JSON.stringify({
          language: result.language,
          ...resStatistics
        }),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    case "text/html":
    case "text/plain":
    default:
      return new Response(result.language, {
        headers: {
          "Content-Type": "text/html"
        }
      });
  }
}
