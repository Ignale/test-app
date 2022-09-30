import { combineReducers, configureStore } from "@reduxjs/toolkit";
import uislice from './uislice';
import {api} from '../services/contactService'
const Reducers = combineReducers({
  ui: uislice,
  [api.reducerPath]: api.reducer
})
const setupStore = () => { 
  return configureStore({
  reducer: Reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})} 

export type appDispatch = appStore['dispatch'];
export type appStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof Reducers>;
export default setupStore