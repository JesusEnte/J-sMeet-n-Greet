import type { Route } from "./+types/route";

import { useState, Suspense, use } from "react";

import SessionName from "~/components/session_name";
import UserSelect from "~/components/user_select";
import BrushSelect from "~/components/brush_select";
import Calendar from "~/components/calendar/calendar";

import { sessionGet } from "~/api/sessions";

import SessionIdContext from "~/contexts/session_id";
import UserIdContext from "~/contexts/user_id";
import BrushContext from "~/contexts/brush";

import './style.css'

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${params.session} | J'sMeet'n'Greet` },
    { name: "description", content: "Session" },
  ];
}

export default function Session({params}: Route.ComponentProps){
  const [brush, setBrush] = useState('draw')
  const [user, setUser] = useState<string>('all')
  const id = params.session.toLowerCase()

  if (use(sessionGet(id)).id == undefined) {
    return <h1>404 not found</h1>
  }

  return <div className='sessionLayout'>
    
    <div className='sessionHeaderLayout'>
      <Suspense fallback={<p>Loading...</p>}>
        <SessionName id={id}/>
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <UserSelect session_id={id} setUser={setUser} activeUser={user}/>
      </Suspense>
      <BrushSelect brush={brush} setBrush={setBrush} active={user != 'all'}/>

    </div>

    <SessionIdContext value={id}>
    <UserIdContext value={user}>
    <BrushContext value={brush}>
      <Calendar/>
    </BrushContext>
    </UserIdContext>
    </SessionIdContext>
  </div>
}