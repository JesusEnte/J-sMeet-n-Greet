import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home | J'sMeet'n'Greet" },
    { name: "description", content: "Home" },
  ];
}

export default function Home() {
  return <>
    <p>home</p>
    <img src='/favicon.ico'/>
  </>
}
