import type { Route } from "./+types/docs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Docs | J'sMeet'n'Greet" },
    { name: "description", content: "Docs" },
  ];
}

export default function Docs(){
    return <p>https://github.com/JesusEnte/JsMeetnGreet</p>
}