import { configureStore, type Middleware } from '@reduxjs/toolkit'
import userRedcuer, { rollbackUser } from './users/slice.ts'
import { toast } from 'sonner'

const persistanceLocalStorageMiddleware: Middleware = (state) => (next) => (action) => {
  // fase 1 store antiguo
  next(action)
  // fase 2 store nuevo
  localStorage.setItem('__redux__state__', JSON.stringify(state.getState()))
}
// ejemplo de actualizar la UI sin haber hecho la accion
const syncWithDatabaseMiddleware: Middleware = store => next => action => {
  const { type, payload } = action
  const prevState = store.getState()
  next(action)
  if (type === 'users/deleteUserById') {
    const userIdToRemove = payload
    const userToRemove = prevState.users.find(user => user.id === userIdToRemove)
    fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al eliminar')

        toast.success('Usuario eliminado')
      }).catch(err => {
        toast.error('Algo salio mal')
        if (userToRemove) {
          store.dispatch(rollbackUser(userToRemove))
        }
      })
  }
}
export const store = configureStore({
  reducer: {
    users: userRedcuer
  },
  middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware]
})

// typeScript
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
