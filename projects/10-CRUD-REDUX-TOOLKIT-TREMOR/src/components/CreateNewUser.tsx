import { Badge, Button, Card, TextInput, Title } from '@tremor/react'
import { useUserActions } from '../hooks/useUserActions'
import { useState, useEffect } from 'react'
import { type UserToEdit } from '../store/users/slice'

interface Props {
  userToEdit: UserToEdit
  handleEdit: (user: UserToEdit) => void
}

export const CreateNewUser = ({ userToEdit, handleEdit }: Props) => {
  const { addUser, editUser } = useUserActions()
  const [result, setResult] = useState<'ok' | 'ko' | null >(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setResult(null)
    const form = event.target as HTMLFormElement
    const data = new FormData(form)

    const name = data.get('name') as string
    const email = data.get('email') as string
    const github = data.get('github') as string

    if (!name || !email || !github) {
      return setResult('ko')
    }

    if (userToEdit != null) {
      editUser({ id: userToEdit.id, name, email, github })
      handleEdit(null)
    } else {
      addUser({ name, email, github })
    }

    setResult('ok')
    form.reset()
  }

  useEffect(() => {
    if (userToEdit != null) {
      const form = document.querySelector('#form')
      const inputs = form?.querySelectorAll('input')
      inputs?.forEach(input => {
        if (input.name === 'name') input.value = userToEdit.name
        if (input.name === 'email') input.value = userToEdit.email
        if (input.name === 'github') input.value = userToEdit.github
      })
    }
  }, [userToEdit])

  return (
        <Card style={{ marginTop: '16px' }} >
            <Title>Create New User</Title>
            <form id='form' className='' onSubmit={handleSubmit}>
            <TextInput name='name' placeholder='Aqui el nombre' />
            <TextInput name='email' placeholder='Aqui el email' />
            <TextInput name='github' placeholder='Aqui el usuario de github' />
            <div>
                <Button
                type='submit'
                style={{ marginTop: '16px' }}>  Crear usuario</Button>
                <span style={{ paddingLeft: '10px' }}>
                    {result === 'ok' && <Badge color='green' > Guardado correctamente </Badge>}
                    {result === 'ko' && <Badge color='red' > Error con los campos </Badge>}
                </span>
            </div>
            </form>
        </Card>
  )
}
