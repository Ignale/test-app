import { Card, CardContent, Table, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import {userSelector} from '../../store/hooks'



function ProfileSettings() {
  const user  = userSelector(state => state.ui)
  return (
    <Card variant='outlined' sx={{padding: 3,marginTop: 5}}>
      <CardContent>
        <Typography variant='h5'>
          Личные данные
        </Typography>
        <TableContainer sx={{marginTop: 2}}>
          <Table>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell>{user.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Фамилия</TableCell>
              <TableCell>{user.sirname}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default ProfileSettings