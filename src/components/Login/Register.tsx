import React, {useState} from 'react'
import styles from './Login.module.css'
import {useAppDispatch, userSelector} from '../../store/hooks'
import {authUser} from '../../store/uislice'
import { NavLink } from 'react-router-dom'
import {Alert, AlertColor, Button, TextField } from '@mui/material'
import { credentials } from '../../models/Contacts'

function Register() {
  const dispatch = useAppDispatch()
  const init: credentials = {
    email: '',
    password: '',
    name: '', 
    sirname: '',
    method: '',
    endpoint: ''
  }
  const user = userSelector(state => state.ui)
    
  const [credentials, setCredentials] = useState(init)
  
  const handleChange = (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    let key = e.target.id;
    let value = e.target.value
    setCredentials(prev => {
      return {...prev, [key]: value, method:'POST', endpoint: 'register' }
    })
  }
  const loginHandler = (event: React.FormEvent) => {
    event.preventDefault()
    dispatch(authUser(credentials))
  }

  return (
    <div className={styles.loginPage}>
      {user.notifications.message && <Alert severity={user.notifications.status as AlertColor || 'success'}>{user.notifications.message}</Alert>}
      <form onSubmit={loginHandler} className={styles.loginForm} >
        <div>
          <TextField size='small'  margin="normal" onChange={handleChange}  id='email' label = 'Введите email' variant='filled' required/>
        </div>
        <div>
          <TextField size='small'  margin="normal" onChange={handleChange}  id='password' type='password' label = 'Введите пароль' variant='filled' required/>
        </div>
        <div>
          <TextField size='small'  margin="normal" onChange={handleChange}  id='name' label = 'Имя' variant='filled' required/>
        </div>
        <div>
          <TextField size='small'  margin="normal" onChange={handleChange}  id='sirname' label = 'Фамилия' variant='filled' required/>
        </div>
        <div className={styles.submit}>
          <Button variant='outlined' type='submit'>Зарегестрироваться</Button>
      </div>
        <p>Уже есть учетная запись? <NavLink to={'/login'}>Войти</NavLink></p>
      </form>
    </div>
  )
}

export default Register