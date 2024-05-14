import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <header style={{ textAlign: "center" }}>
          <h1>REI todolist</h1>
          <div>Welcome to my todolist application!</div>
        </header>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
