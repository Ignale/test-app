import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {User, credentials} from '../models/Contacts'

const initialState: User = {
  isAuth: false,
  id: 0,
  email: '',
  name: '',
  sirname: '',
  token: '',
  notifications: {status: '', message: ''},
  contacts: []
}
const initialAuth = () => {
if(localStorage.getItem('token')) {
  return {
    isAuth: true,
    email: localStorage.getItem('email') as string,
    id: Number(localStorage.getItem('id')) as number,
    sirname: localStorage.getItem('sirname') as string,
    name: localStorage.getItem('name') as string,
    token: localStorage.getItem('token'),
    notifications: {status: '', message: ''},
    contacts: []
    }
  }
  return initialState
}
export const authUser= createAsyncThunk('auth/fetchUser', 
async (credentials: credentials) => {
 
    const response = await fetch(`https://json-server-app.herokuapp.com/${credentials.endpoint}`, {
    method: credentials.method, 
    body: JSON.stringify(credentials.endpoint === 'login'? 
    {email: credentials.email, password: credentials.password}: 
    {email: credentials.email, password: credentials.password, name: credentials.name, sirname: credentials.sirname}
    ),
    headers: {'Content-Type': 'application/json'}
  })
  if(!response.ok) {
    let error = (await response.text().then(text=>text)).toString()
    throw new Error(error as string)
  }
  console.log(response)
  return response.json()
}
)
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth(), 
  reducers: {
    logout() {
      localStorage.clear()
      return initialState
    }
  },
  extraReducers: builder => {
    builder
    .addCase(authUser.pending, (state, action) => {
      state.notifications.status = 'info'
      state.notifications.message = 'Please wait'
    })
    .addCase(authUser.fulfilled, (state, action) => {
      state.isAuth = true
      state.id = action.payload.user.id
      localStorage.setItem('isAuth', 'true')
      localStorage.setItem('token', action.payload.accessToken)
      localStorage.setItem('id', `${state.id}`)
      state.name = action.payload.user.name
      localStorage.setItem('name', state.name)
      state.sirname = action.payload.user.sirname
      localStorage.setItem('sirname', state.sirname)
      state.email = action.payload.user.email
      localStorage.setItem('email', state.email)
      state.notifications.status = 'success'
      state.notifications.message = 'Success!'
      
    })
    .addCase(authUser.rejected, (state, action) => {
      state.notifications.status = 'error'
      state.notifications.message = action.error.message
      console.log(action)
    })
  
}
});
export const uiActions = authSlice.actions;
export default authSlice.reducer;
