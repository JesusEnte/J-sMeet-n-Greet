import { sessionGet } from "~/api/session";
import type { Route } from "./+types/route";
import { useEffect, useState } from "react";

export function meta({ params }: Route.MetaArgs) {
  const [name, setName] = useState(params.session)
  useEffect(() => {
    (async () => {
      setName((await sessionGet(params.session)).name)
    })()
  }, [])
  return [
    { title: `${name} | J'sMeet'n'Greet` },
    { name: "description", content: "Session" },
  ];
}

export default function Session({params}: Route.ComponentProps){
  const [name, setName] = useState('')
  useEffect(() => {
    (async () => {
      setName((await sessionGet(params.session)).name)
    })()
  }, [])
  return <p>session {name} {params.session}</p>
}