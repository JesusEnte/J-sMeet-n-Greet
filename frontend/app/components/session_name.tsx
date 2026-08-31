import { use, useTransition } from "react"

import { RotatingLines } from "react-loader-spinner"

import { sessionGet, sessionUpdate } from "~/api/sessions"
import { invalidateApiCache } from "~/api/common"

export default function SessionName({id}: {id: string}){
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
    <input style={{width: '100%'}} type='text' placeholder='Event Name' defaultValue={name} onKeyDown={onEnter}/>
    {pending && <RotatingLines height='1.5em' color='white'/>} 
  </div>
}