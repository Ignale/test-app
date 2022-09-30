import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {RootState, appDispatch} from './store'

// export const useNotificationDispatch = () => useDispatch<NotificationDispatch>();
export const userSelector: TypedUseSelectorHook<RootState> = useSelector; 
export const useAppDispatch = () => useDispatch<appDispatch>()
//Добавляем настройи и привязываем типы
