import type { Route } from "./+types/create";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create | J'sMeet'n'Greet" },
    { name: "description", content: "Create" },
  ];
}

export default function Create(){
    return <p>create</p>
}