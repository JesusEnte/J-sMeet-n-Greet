import { sessionGet, sessionUpdate } from "~/api/session";
import type { Route } from "./+types/route";
import { useState, use, Suspense, useTransition, useRef } from "react";
import './style.css'
import { RotatingLines } from "react-loader-spinner";
import { invalidateApiCache } from "~/api/common";
import erase_icon from './erase.jpg'
import draw_icon from './draw.jpg'
import { createUser, removeUser, usersGet } from "~/api/user";
import { dateToMonday, dateToShortISO, dayToDayname } from "~/utils/date";
import SessionIdContext from "~/contexts/session_id";
import UserIdContext from "~/contexts/user_id";
import BrushContext from "~/contexts/brush";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${params.session} | J'sMeet'n'Greet` },
    { name: "description", content: "Session" },
  ];
}

export default function Session({params}: Route.ComponentProps){
  const [brush, setBrush] = useState('draw')
  const [user, setUser] = useState<string>('all')
  const id = params.session
  return <div className='sessionLayout'>
    
    <div className='sessionHeaderLayout'>
      
      <Suspense fallback={<p>Loading...</p>}>
        <SessionName id={id}/>
      </Suspense>
      
      <Suspense fallback={<p>Loading...</p>}>
        <UserSelect session_id={id} setUser={setUser} activeUser={user}/>
      </Suspense>
        
      <BrushSelect brush={brush} setBrush={setBrush}/>

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

function SessionName({id}: {id: string}){
  const name = use(sessionGet(id)).name
  const [pending, startTransition] = useTransition()

  function onEnter(event: React.KeyboardEvent<HTMLInputElement>){
    if (event.key != 'Enter') return
    const target = event.target as HTMLInputElement
    const value = target.value
    if (value == '') return
    startTransition(async () => {
      await sessionUpdate(id, value)
      invalidateApiCache()
    })
  }

  return <div style={{display: 'flex', alignContent: 'center'}}>
    <input className='sessionName' type='text' placeholder='Event Name' defaultValue={name} onKeyDown={onEnter}/>
    {pending && <RotatingLines height='1.5em' color='white'/>} 
  </div>
}

function UserSelect({session_id, activeUser, setUser}: {session_id: string, activeUser: string, setUser: React.Dispatch<React.SetStateAction<string>>}){
  const users = use(usersGet(session_id))
  const [add, toggleAdd] = useState(false)
  const [remove, toggleRemove] = useState(false)
  
  //add/remove eventhandlers
  async function addOnEnter(event: React.KeyboardEvent<HTMLInputElement>){
    if (event.key != 'Enter') return
    toggleAdd(false)
    const target = event.target as HTMLInputElement
    const value = target.value
    if (value == '') return
    //add user via apicall
    const {id} = await createUser(session_id, value)
    invalidateApiCache()
    setUser(id)
  }
  async function removeOnEnter(event: React.KeyboardEvent<HTMLInputElement>){
    if (event.key != 'Enter') return
    toggleRemove(false)
    const target = event.target as HTMLInputElement
    const value = target.value
    //remove user (if existing) via apicall
    let id = null
    for (const user of users) {
      if (user.name == value) {
        id = user.id
        break
      }
    }
    if (id == null) return

    await removeUser(session_id, id)
    invalidateApiCache()
    setUser('all')
  }

  //add/remove input fields
  if (add) {
    return <input 
      className='userSelect'
      placeholder="Add"
      onKeyDown={addOnEnter}
    />
  }
  if (remove) {
    return <input 
      className='userSelect'
      placeholder="Remove"
      onKeyDown={removeOnEnter}
    />
  }

  //selection
  return <select className='userSelect'
    defaultValue={activeUser}
    onChange={(event) => {
      const target = event.target as HTMLSelectElement
      const value = target.value
      if (value == 'remove') toggleRemove(true)
      else if (value == 'add') toggleAdd(true)
    }}
  >
    {/*All button*/}
    <option 
      style={{color: 'cyan'}}
      onClick={() => {setUser('all')}}
    >All</option>

    {/*Individual users button*/}
    {users.map(user => 
      <option 
        key={user.id}
        onClick={() => {setUser(user.id)}}
      >{user.name}</option>
    )}

    {/*Add/Remove buttons*/}
    <option 
      style={{color: 'green'}}
      value='add'
    >Add</option>
    <option 
      style={{color: 'red'}}
      value='remove'
    >Remove</option>
  </select>
}

function BrushSelect({brush, setBrush}: {brush: string, setBrush: React.Dispatch<React.SetStateAction<string>>}){
  return <div className='brushSelect'>
    <img 
      style={{...(brush != 'draw' && {opacity: 0.5})}} 
      onClick={() => {setBrush('draw')}}
      src={draw_icon}
    />
    <img 
      style={{...(brush != 'erase' && {opacity: 0.5})}} 
      onClick={() => {setBrush('erase')}}
      src={erase_icon}
    />
  </div>
}

function Calendar(){
  const [date, setDate] = useState(dateToMonday(new Date()))
  return <div className='calendar'>
    <WeekSelector date={date} setDate={setDate}/>
    <Week startDate={date}/>
  </div>
}

function WeekSelector({date, setDate}: {date: Date, setDate: React.Dispatch<React.SetStateAction<Date>>}){
  const inputRef = useRef<HTMLInputElement>(null)

  return <div className='weekSelector'>
    <button
      onClick={() => {
        let newDate = new Date(date)
        newDate.setDate(date.getDate() - 7)
        newDate = dateToMonday(newDate)
        setDate(newDate)
      }}
    >&lt;</button>
    <input 
      ref={inputRef} 
      type='date'
      value={dateToShortISO(date)}
      onChange={() => {
        setDate(dateToMonday(inputRef.current!.valueAsDate!))
      }}
    />
    <button
      onClick={() => {
        let newDate = new Date(date)
        newDate.setDate(date.getDate() + 7)
        newDate = dateToMonday(newDate)
        setDate(newDate)
      }}
    >&gt;</button>
  </div>
}

function Week({startDate}: {startDate: Date}){
  let dayComponents = []
  for (let i = 0; i < 7; i++){
    let date = new Date(startDate)
    date.setDate(startDate.getDate()  + i)
    dayComponents[i] = <Day date={date}/>
  }
  return <div className="week">
    {...dayComponents}
  </div>
}

function Day({date}: {date: Date}){
  let hourComponents = []
  for (let i = 0; i < 24; i++){
    hourComponents[i] = <p className='hour'>{i}</p>
  }

  return <div className='day'>
    <p style={{backgroundColor: 'rgba(190, 0, 149, 0.46)'}}>{dayToDayname(date.getDay())}</p>
    <p style={{backgroundColor: 'rgba(190, 0, 149, 0.22)'}}>{String(date.getDate()).padStart(2, '0')}</p>
    {...hourComponents}
  </div>
}