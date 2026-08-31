import { use, useState } from "react"

import { usersGet,  userCreate, userRemove} from "~/api/user"
import { invalidateApiCache } from "~/api/common"

export default function UserSelect({session_id, activeUser, setUser}: {session_id: string, activeUser: string, setUser: React.Dispatch<React.SetStateAction<string>>}){
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
    const {id} = await userCreate(session_id, value)
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

    await userRemove(session_id, id)
    invalidateApiCache()
    setUser('all')
  }

  //add/remove input fields
  if (add) {
    return <input 
      style={{width: '100%'}}
      placeholder="Add"
      onKeyDown={addOnEnter}
    />
  }
  if (remove) {
    return <input 
      style={{width: '100%'}}
      placeholder="Remove"
      onKeyDown={removeOnEnter}
    />
  }

  //selection
  return <select
    style={{width: '100%'}}
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