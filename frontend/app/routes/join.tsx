import type { Route } from "./+types/join";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Join | J'sMeet'n'Greet" },
    { name: "description", content: "Join" },
  ];
}

export default function Join(){
    return <p>join</p>
}