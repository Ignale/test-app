import { Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import {userSelector} from '../../store/hooks'
import ProfileSettings from './ProfileSettings'

function Home() {
  const user  = userSelector(state => state.ui)
    
  return (
    <div>
      {user.isAuth && <Typography variant='h5' >Добро пожаловать  {user.name}  
      </Typography>}
      {!user.isAuth && <Typography variant='h5' >Добро пожаловать тестовое приложение. <br /> <NavLink to={'login'}>Войдите</NavLink> под своим действующим логином и паролем или <NavLink to={'reg'}>зарегестрируйтесь</NavLink> 
      </Typography>}
      {user.isAuth && <ProfileSettings />}
    </div>
  )
}

export default Home