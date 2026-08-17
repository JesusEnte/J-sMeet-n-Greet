import { sessionGet } from "~/api/session";
import type { Route } from "./+types/route";
import { useEffect, useState, use, Suspense } from "react";

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
  return <p>session <Suspense fallback={<p>Loading...</p>}> <Test id={params.session}/> </Suspense> {params.session}</p>
}

function Test({id}: {id: string}){
  const name = use(sessionGet(id)).name
  return <p>{name}</p>
}