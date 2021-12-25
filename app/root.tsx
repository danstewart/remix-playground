import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch
} from "remix";
import type { LinksFunction } from "remix";
import { useLocation } from "react-router-dom";

import mainStyles from "~/styles/dist/tailwind.css";

// https://remix.run/api/app#links
export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: mainStyles },
    { rel: "stylesheet", href: "/vendor/highlight.min.css" },
  ];
};

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

function Document({ children, title }: { children: React.ReactNode; title?: string; }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {/* {process.env.NODE_ENV === "development" && <LiveReload />} */}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  let location = useLocation();

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between mb-10">
        <div className="flex space-x-7">

          {/* Logo/Header */}
          <a href="/" className="flex items-center py-4 px-2">
            <span className="font-semibold text-gray-500 text-lg">Snippy</span>
          </a>

          {/* Main nav */}
          <div className="hidden md:flex items-center space-x-1">
            <a href="/" className={`nav-item ${location.pathname == "/" ? "active" : ""}`}>Home</a>
            <a href="/popular" className={`nav-item ${location.pathname == "/popular" ? "active" : ""}`}>Popular</a>
            <a href="/latest" className={`nav-item ${location.pathname == "/latest" ? "active" : ""}`}>Latest</a>
            <a href="/my-snippets" className={`nav-item ${location.pathname == "/my-snippets" ? "active" : ""}`}>My Snippets</a>
          </div>
        </div>

        {/* Log in/Sign up */}
        <div className="hidden md:flex items-center space-x-3">
          <a href="" className="btn btn-secondary">Sign Up</a>
          <a href="" className="btn btn-primary">Log In</a>
        </div>
      </div>

      <Outlet />
    </div >
  )
}
