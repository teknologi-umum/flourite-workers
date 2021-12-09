# Flourite Workers

Dead simple, ready-to-go Cloudflare worker app to guess any of your input with Flourite!

A batteries included template for kick starting a TypeScript Cloudflare worker project.

## Usage

1. Create a HTTP POST request to `https://flourite-workers.teknologi-umum.workers.dev`
2. Add your code on the request body.
3. Send the request.
4. Enjoy the result!

Really, it's that simple.

Just add a header of `Accept: application/json` if you need to look at the statistic for the detected languages.

### Javascript

```js
fetch(
  "https://flourite-workers.teknologi-umum.workers.dev",
  {
    method: "POST",
    body: "Console.WriteLine(\"Hello World!\")",
    headers: {
      Accept: "text/plain"
    }
  }
)
.then(response => response.text())
.then(text => console.log(text))
```

## License

[MIT](./LICENSE)
