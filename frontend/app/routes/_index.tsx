import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home | J'sMeet'n'Greet" },
    { name: "description", content: "Home" },
  ];
}

export default function Home() {
  return <>
    <p>Homie Page</p>
    <img src='/favicon.ico'/>
  </>
}
