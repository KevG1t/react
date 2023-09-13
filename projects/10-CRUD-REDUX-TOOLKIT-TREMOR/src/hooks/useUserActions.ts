import { useAppDispatch } from '../hooks/store.ts'
import { deleteUserById, UserId, addNewUser, User, userToEdit, UserWithId } from '../store/users/slice.ts'

export function useUserActions () {
  const dispatch = useAppDispatch()

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  const addUser = ({ name, email, github }: User) => {
    dispatch(addNewUser({ name, email, github }))
  }

  const editUser = ({ id, name, email, github }: UserWithId) => {
    dispatch(userToEdit({ id, name, email, github }))
  }

  return { removeUser, addUser, editUser }
}
