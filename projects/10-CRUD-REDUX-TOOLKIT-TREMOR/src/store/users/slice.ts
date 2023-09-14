import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE = [
  {
    id: '1',
    name: 'kevin',
    email: 'kevin@gmail.com',
    github: 'KevG1t'
  },
  {
    id: '2',
    name: 'Miguel',
    email: 'miguel@gmail.com',
    github: 'midudev'
  },
  {
    id: '3',
    name: 'Anthony',
    email: 'anthony@gmail.com',
    github: 'Anthematica'
  }
]

export type UserId = string

export interface User {
  name: string;
  email: string;
  github: string;
}

export interface UserWithId extends User{
  id: UserId;
}
export type UserToEdit = UserWithId | null

// en la realidad esto es []
const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem('__redux__state__')
  return (persistedState) ? JSON.parse(persistedState).users : DEFAULT_STATE
})()

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter((user) => user.id !== id)
    },
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID()
      state.push({ id, ...action.payload })
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const idUserAlreadyDefined = state.some(user => user.id === action.payload.id)
      if (!idUserAlreadyDefined) {
        state.push(action.payload)
      }
    },
    userToEdit: (state, action: PayloadAction<UserWithId>) => {
      const indexOfUser = state.findIndex(user => user.id === action.payload.id)
      if (indexOfUser !== -1) {
        state.splice(indexOfUser, 1, action.payload)
      }
    }
  }
})

// para el store
export default usersSlice.reducer

// actions
export const { deleteUserById, rollbackUser, addNewUser, userToEdit } = usersSlice.actions
