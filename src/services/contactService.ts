
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {User, Contact} from '../models/Contacts'


type ContactsResponse = User['contacts']

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
  reducerPath: 'contactsAPI',
  tagTypes: ['Contacts'],
  endpoints: (build) => ({
    getContacts: build.query<ContactsResponse, number>({
      query: (id) => ({
        url:`user/${id}/contacts`,
      }),
      providesTags: (result) => ['Contacts']
    }),
    updateContacts: build.mutation<Contact, Contact>({
      query: (cont) => ({
        url: `contacts/${cont.id}`,
        method: 'PUT', 
        body: cont
      }),
      invalidatesTags: ['Contacts']
    }),
    addContacts: build.mutation<Contact, (number | Contact)[]>({
      query: ([userId, cont]) => ({
        url: `user/${userId}/contacts/`,
        method: 'POST',
        body: cont
      }),
      invalidatesTags: ['Contacts']
    }),
    deleteContacts: build.mutation<Contact, Contact['id']>({
      query: (contactID) => ({
        url: `/contacts/${contactID}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts']
    })
  })
})