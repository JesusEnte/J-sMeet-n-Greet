import type { Route } from "./+types/$session";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${params.session} | J'sMeet'n'Greet` },
    { name: "description", content: "Session" },
  ];
}

export default function Session({params}: Route.ComponentProps){
    return <p>session {params.session}</p>
}