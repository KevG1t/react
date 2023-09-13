import { useAppDispatch } from '../hooks/store.ts'
import { deleteUserById, UserId, addNewUser, User } from '../store/users/slice.ts'

export function useUserActions () {
  const dispatch = useAppDispatch()

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  const addUser = ({ name, email, github }: User) => {
    dispatch(addNewUser({ name, email, github }))
  }

  return { removeUser, addUser }
}
