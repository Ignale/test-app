import React, {useState} from 'react'
import {api} from '../../services/contactService'
import ContactCard from './ContactCard'
import {userSelector} from '../../store/hooks'
import AddContactForm from './AddContactForm'
import { Button, Skeleton, TextField } from '@mui/material'
import { Stack } from '@mui/system'


const Admin = () => {
  const [addContactMode, setAddContactMode] = useState(false)
  const [input, setinput] = useState('')
  const userId = userSelector(state => state.ui.id)
  const {data: contacts, error, isLoading} = api.useGetContactsQuery(userId)

  const filteredContacts = contacts?.filter(contact => {
    return (contact.name.toUpperCase().indexOf(input.toUpperCase()) !== -1 || 
            contact.additionalInfo.toUpperCase().indexOf(input.toUpperCase()) !== -1)})
  return (
    <div>
      <TextField placeholder='Поиск' sx={{width: '100%'}} onChange={(e:React.BaseSyntheticEvent) => setinput(e.target.value)} />
      {isLoading && 
      <Stack spacing={1}>
        <Skeleton variant='text' sx={{fontSize: '24px'}} />
        <Skeleton variant='circular' width={20} height={20} sx={{position: 'absolute',top: 10, right: 60 }}/>
        <Skeleton variant='circular' width={20} height={20} sx={{position: 'absolute',top: 10, right: 20 }}/>
        <Skeleton variant='text' sx={{fontSize: '18px'}} />
        <Skeleton variant='text' sx={{fontSize: '18px'}} />
      </Stack>}
      {error && <h1>Some error occured</h1>}
      {contacts && (filteredContacts || contacts).map(contact => <ContactCard key={contact.id} contact = {contact}  />)}
      {!addContactMode && <Button variant='contained'  sx={{marginTop: 2}} onClick={() => setAddContactMode(true)}> Добавить контакт </Button>}
      {addContactMode && <AddContactForm onClose = {setAddContactMode} />}
    </div>
  )
}

export default Admin