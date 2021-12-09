import { handleRequest } from "../src/handler";
import makeServiceWorkerEnv from "service-worker-mock";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line no-var
declare var global: any;

describe("handle", () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv());
    jest.resetModules();
  });

  test("handle simple POST request", async () => {
    const result = await handleRequest(
      new Request("/", { method: "POST", body: "console.log(\"Hello world\");" })
    );
    expect(result.status).toEqual(200);
    const text = await result.text();
    expect(text).toEqual("Javascript");
  });

  test("handle POST request with params shiki", async () => {
    const result = await handleRequest(
      new Request("/?shiki=true", {
        method: "POST",
        body: "using System;\nConsole.WriteLine(\"Hello World\");"
      })
    );
    expect(result.status).toEqual(200);
    const text = await result.text();
    expect(text).toEqual("csharp");
  });

  test("handle JSON request", async () => {
    const result = await handleRequest(
      new Request("/", {
        method: "POST",
        body: "func main() {\nfmt.Println(\"Hello World\")\n}",
        headers: { Accept: "application/json" }
      })
    );
    expect(result.status).toEqual(200);
    const text = await result.json();
    expect(text).toEqual({ language: "Go" });
  });

  test("handle statistics", async () => {
    const result = await handleRequest(
      new Request("/?statistics=true", {
        method: "POST",
        body: "func main() {\nfmt.Println(\"Hello World\")\n}",
        headers: { Accept: "application/json" }
      })
    );
    expect(result.status).toEqual(200);
    const text = await result.json();
    expect(text).toEqual({
      language: "Go",
      statistics: {
        C: 0,
        "C#": 0,
        "C++": 0,
        CSS: 0,
        Clojure: 0,
        Dockerfile: 0,
        Elixir: 0,
        Go: 10,
        HTML: 0,
        JSON: 0,
        Java: 0,
        Javascript: -20,
        Julia: 0,
        Kotlin: 0,
        Lua: 0,
        Markdown: 0,
        PHP: 0,
        Pascal: 0,
        Python: 0,
        Ruby: 0,
        Rust: -20,
        SQL: 0,
        Unknown: 1,
        YAML: 0
      }
    });
  });

  test("handle empty body", async () => {
    const result = await handleRequest(
      new Request("/", {
        method: "POST",
        body: ""
      })
    );
    expect(result.status).toEqual(400);
    const text = await result.text();
    expect(text).toEqual("Body is empty");
  });
});
