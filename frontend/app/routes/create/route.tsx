import { sessionCreate } from "~/api/sessions";
import type { Route } from "./+types/route";
import './style.css'
import { invalidateApiCache } from "~/api/common";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create | J'sMeet'n'Greet" },
    { name: "description", content: "Create" },
  ];
}

export default function Create(){
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
      event.preventDefault()
      
      const target = event.target
      const formData = new FormData(target)
      const name = formData.get('name') as string
      if (name === '') return

      const {id} = await sessionCreate(name)
      invalidateApiCache()
      window.location.pathname = id
    }
    
    return <div className='createFormContainer'>
      <form onSubmit={handleSubmit} className='createForm'>
        <label htmlFor='createNameInput'>Name</label>
        <p>What's the name of your event?</p>
        <input id='createNameInput' name='name' type='text' placeholder='Fluppenfreunde Lake Meetup'/>
        <input type='submit' value='Create!'/>
      </form>
    </div>
}