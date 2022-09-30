import React, {useState} from 'react'
import {Contact} from '../../models/Contacts'
import style from './ContactCard.module.css'
import Card from '../../Layout/Card'
import { api } from '../../services/contactService'
import { IconButton, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateIcon from '@mui/icons-material/Update';
type Props = {contact: Contact}

const ContactCard: React.FC<Props> = ({contact}) => {
  const [editMode, setEditMode] = useState(false)
  const [updatedContact, setupdatedContact] = useState(contact)
  
  const [deleteContact] = api.useDeleteContactsMutation()
  const [updateContact] = api.useUpdateContactsMutation()


  const deleteCont = (e: React.MouseEvent) => {
    e.preventDefault()
    deleteContact(contact.id)
  }
  const editHandler = (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    const value = e.target.value
    const key = e.target.id
    setupdatedContact(prev => {
      return {...prev, [key]: value}
    })
  }
  const updateHandler = (e: React.MouseEvent) => {
    updateContact(updatedContact)
    setEditMode(false)
  }
  const editModeHandler = (e: React.MouseEvent) => {
    setEditMode(!editMode)
  }

  return (
    <Card>
      <div className={style.name}>
        {editMode ? <TextField size="small" defaultValue={contact.name} id = 'name' onChange = {editHandler}/> : contact.name}</div>
      <div className={style.phone}>
        {editMode ? <TextField size="small" defaultValue={contact.phone} id = 'phone' onChange = {editHandler} /> : contact.phone}</div>
      <div className={style.company}>
        {editMode ? <TextField size="small" id = 'additionalInfo' defaultValue = {contact.additionalInfo} onChange = {editHandler} /> : contact.additionalInfo}</div>
      {editMode ? <IconButton  sx={{position: 'absolute',top: 10, right: 60 }} onClick={updateHandler}> <UpdateIcon /> </IconButton>  : <IconButton color='primary'  sx={{position: 'absolute',top: 10, right: 60 }} onClick={editModeHandler} > <EditIcon /> </IconButton>}
      <IconButton color='primary' sx={{position: 'absolute',top: 10, right: 20 }} onClick={deleteCont}> <DeleteIcon /> </IconButton>
    </Card>

      
  
  )
}

export default ContactCard