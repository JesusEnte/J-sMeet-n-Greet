import { sessionGet, sessionUpdate } from "~/api/session";
import type { Route } from "./+types/route";
import { useEffect, useState, use, Suspense, useTransition } from "react";
import './style.css'
import { RotatingLines } from "react-loader-spinner";
import { invalidateApiCache } from "~/api/common";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `J'sMeet'n'Greet` },
    { name: "description", content: "Session" },
  ];
}

export default function Session({params}: Route.ComponentProps){
  const [brush, setBrush] = useState('draw')
  const id = params.session
  return <div className='sessionLayout'>
    <div className='sessionHeaderLayout'>
      <Suspense fallback={<h1>Loading...</h1>}>
        <SessionName id={id}/>
        <UserSelect id={id}/>
        <BrushSelect brush={brush} setBrush={setBrush}/>
      </Suspense>
      <div style={{display: 'block', width: '100%', border: '2px solid white'}}>

      </div>
    </div>
  </div>
}

function SessionName({id}: {id: string}){
  const name = use(sessionGet(id)).name
  const [pending, startTransition] = useTransition()

  function onEnter(event: React.KeyboardEvent<HTMLInputElement>){
    if (event.key != 'Enter') return
    const target = event.target as HTMLInputElement
    const value = target.value
    if (value != '' && value != name) {
    startTransition(async () => {
        await sessionUpdate(id, value)
        invalidateApiCache()
      })
    }
  }

  return <div style={{display: 'flex', alignContent: 'center'}}>
    <input className='sessionName' type='text' placeholder='Event Name' defaultValue={name} onKeyDown={onEnter}/>
    {pending && <RotatingLines height='1.5em' color='white'/>} 
  </div>
}

function UserSelect({id}: {id: string}){
  const test = ['ben', 'linuz', 'sarah', 'sarah']
  return <select className='userSelect'>
    <option style={{color: 'cyan'}}>All</option>
    {test.map(n => 
      <option>{n}</option>
    )}
    <option style={{color: 'green'}}>Add</option>
    <option style={{color: 'red'}}>Remove</option>
  </select>
}

function BrushSelect({brush, setBrush}: {brush: string, setBrush: React.Dispatch<React.SetStateAction<string>>}){
  return <div className='brushSelect'>
    <button style={{...(brush != 'draw' && {color: 'gray'})}} onClick={() => {setBrush('draw')}}>draw</button>
    <button style={{...(brush != 'erase' && {color: 'gray'})}} onClick={() => {setBrush('erase')}}>erase</button>
  </div>
}