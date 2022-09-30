import React from 'react'
import style from './Navigation.module.css'
import {NavLink} from 'react-router-dom'
import {userSelector, useAppDispatch} from '../../store/hooks'
import Button from '@mui/material/Button';
import {uiActions} from '../../store/uislice'

type Props = {}

const Navigation:React.FC = (props: Props) => {
    const user = userSelector(state => state.ui)
    const dispatch = useAppDispatch()
    const logoutHandler = () => {
      dispatch(uiActions.logout())
    }

  return (
    <header className={style.header}>
      <NavLink to={'/'}>На главную</NavLink>
      {!user.isAuth && <NavLink to= {'/login'}>Войти</NavLink>}
      {user.isAuth && <NavLink to= {'/contacts'}>Контакты</NavLink> }
      {user.isAuth && <Button variant="outlined" size='small' onClick={logoutHandler}>Выйти</Button>}
    </header>
    
  )
}

export default Navigation