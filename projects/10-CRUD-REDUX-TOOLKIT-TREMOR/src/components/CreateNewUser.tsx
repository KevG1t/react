import { Badge, Button, Card, TextInput, Title } from '@tremor/react'
import { useUserActions } from '../hooks/useUserActions'
import { useState } from 'react'

export function CreateNewUser () {
  const { addUser } = useUserActions()
  const [result, setResult] = useState<'ok' | 'ko' | null >(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setResult(null)
    const form = event.target
    const data = new FormData(form)

    const name = data.get('name') as string
    const email = data.get('email') as string
    const github = data.get('github') as string

    if (!name || !email || !github) {
      return setResult('ko')
    }

    addUser({ name, email, github })
    setResult('ok')
    form.reset()
  }
  return (
        <Card style={{ marginTop: '16px' }} >
            <Title>Create New User</Title>
            <form className='' onSubmit={handleSubmit}>
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
