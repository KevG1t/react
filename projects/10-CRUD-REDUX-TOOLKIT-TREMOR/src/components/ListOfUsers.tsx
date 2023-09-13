import {
  Card,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Title,
  Badge
} from '@tremor/react'
import { Delete, Edit } from './Icons'
import { useAppSelector } from '../hooks/store.ts'
import { useUserActions } from '../hooks/useUserActions.ts'

export function ListOfUsers () {
  const users = useAppSelector((state) => state.users)

  const { removeUser } = useUserActions()

  return (
      <Card>
        <Title style={{ display: 'flex', gap: '8px' }} >
            Usuarios
            <Badge >{users.length}</Badge>
        </Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Id</TableHeaderCell>
              <TableHeaderCell >Nombre</TableHeaderCell>
              <TableHeaderCell >Correo</TableHeaderCell>
              <TableHeaderCell >Acciones</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.id}</TableCell>
                <TableCell style={{ display: 'flex', gap: '8px', alignItems: 'center' }} >
                    <img style={{ borderRadius: '50%', width: '32px', height: '32px' }} src={`http://unavatar.io/github/${item.github}`} alt={item.name} />
                     {item.name}
                </TableCell>
                <TableCell >{item.email}</TableCell>
                <TableCell >
                  <button type="button">
                       <Edit />
                  </button>
                  <button onClick={() => removeUser(item.id)} type="button">
                        <Delete />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
  )
}
