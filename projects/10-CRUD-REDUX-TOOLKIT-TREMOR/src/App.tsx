import { Toaster } from 'sonner'
import './App.css'
import { CreateNewUser } from './components/CreateNewUser'
import { ListOfUsers } from './components/ListOfUsers'
import { UserWithId } from './store/users/slice'
import { useState } from 'react'

function App () {
  const [userToEdit, setUserToEdit] = useState<UserWithId | null >(null)
  return (
   <>
     <ListOfUsers handleEdit={setUserToEdit} />
    <CreateNewUser userToEdit={userToEdit} handleEdit={setUserToEdit} />
    <Toaster richColors/>
   </>
  )
}

export default App
