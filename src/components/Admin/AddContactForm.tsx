import React, {useState} from 'react'
import s from './AddContactForm.module.css'
import {userSelector} from '../../store/hooks'
import { api } from '../../services/contactService'
import {Contact} from '../../models/Contacts'
import Card from '../../Layout/Card'
import {Button, IconButton, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
type Props = {
  onClose: (p: boolean)=> void
}

function AddContactForm(props: Props) {
  const initialContact: Contact = {
    name: '',
    additionalInfo: '',
    phone: ''
  }
  
  const [addContact] = api.useAddContactsMutation()
  const [contact, setContact] = useState(initialContact)
  const userId = userSelector(state=> state.ui.id)
  const editContactHandler = (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    const key = e.target.id
    const value = e.target.value
    setContact(prev => {
      return {...prev, [key]: value}
    })
    console.log(contact)
  }
  const addContactHandler = (e: React.FormEvent) => {
    e.preventDefault()
    
    addContact([userId, contact])
  }
  return (
    <Card>
      <form onSubmit={addContactHandler} className={s.addForm} action="#">
        <TextField  margin="normal" onChange={editContactHandler}  id='name' label = 'Имя' variant='filled' required/>
        <TextField  margin="normal" onChange={editContactHandler}  id='phone' label = 'Телефон' variant='filled' required/>
        <TextField  margin="normal" onChange={editContactHandler}  id='additionalInfo' label = 'Дополнительная информация' variant='filled' required/>
        <Button className={s.send} type="submit" variant='outlined'> Отправить </Button>
        <IconButton sx={{position: 'absolute', top: 10, right: 10}} onClick={() => props.onClose(false)} ><CloseIcon /></IconButton>
      </form>
    </Card>
  )
}

export default AddContactForm