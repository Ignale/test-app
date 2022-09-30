import React, {useState} from 'react'
import styles from './Login.module.css'
import {useAppDispatch, userSelector} from '../../store/hooks'
import {authUser} from '../../store/uislice'
import { NavLink } from 'react-router-dom'
import { Alert, AlertColor, Button, TextField } from '@mui/material'
import { credentials } from '../../models/Contacts'



function Login() {
  const init: credentials = {
    email: '',
    password: '',
    method: '',
    endpoint: ''
  }
  const [credentials, setCredentials] = useState(init)
  const dispatch = useAppDispatch()
  const user = userSelector(state => state.ui)  
  const handleChange = (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    let key = e.target.id;
    let value = e.target.value
    setCredentials(prev => {
      return {...prev, [key]: value, method:'POST', endpoint: 'login' }
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
        <TextField size='small'  margin="normal" onChange={handleChange} type = 'password'  id='password' label = 'Введите пароль' variant='filled' required/>
      </div>
      <div className={styles.submit}>
        <Button variant='outlined' type='submit'>Войти</Button>
      </div>
      <p>Не зарегестрированы? <NavLink to={'/reg'}>Зарегестрироваться</NavLink></p>
    </form>
      
    </div>
  )
}

export default Login