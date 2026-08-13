import type { Route } from "./+types/route";
import './style.css';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Join | J'sMeet'n'Greet" },
    { name: "description", content: "Join" },
  ];
}

export default function Join(){
    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>){
      event.preventDefault()
      
      const target = event.target
      const formData = new FormData(target)
      const id = formData.get('id') as string
      if (id === '') return

      window.location.pathname = id
    }

    return <div className='joinFormContainer'>
      <form onSubmit={handleSubmit} className='joinForm'>
        <label htmlFor='joinIdInput'>ID</label>
        <input id='joinIdInput' name='id' placeholder='XXXXX'/>
        <input type='submit' value='Join!'/>
      </form>
    </div>
}