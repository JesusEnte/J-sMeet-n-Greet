import { sessionGet } from "~/api/session";
import type { Route } from "./+types/route";
import './style.css';
import { useState } from "react";
import { invalidateApiCache } from "~/api/common";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Join | J'sMeet'n'Greet" },
    { name: "description", content: "Join" },
  ];
}

export default function Join(){
    const [error, setError] = useState(false)

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>){
      event.preventDefault()
      
      const target = event.target
      const formData = new FormData(target)
      const id = formData.get('id') as string
      if (id === '') return

      if ((await sessionGet(id)).id != undefined) {
        invalidateApiCache()
        window.location.pathname = id
      } else {
        setError(true)
      }

    }

    return <div className='joinFormContainer'>
      <form onSubmit={handleSubmit} className='joinForm'>
        <label htmlFor='joinIdInput'>ID</label>
        <input id='joinIdInput' name='id' placeholder='XXXXX'/>
        {error ? <p className='error'>There is no session with that ID, try again.</p> : null}
        <input type='submit' value='Join!'/>
      </form>
    </div>
}