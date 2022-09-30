import { Navigate, Route, Routes} from 'react-router-dom'
import Admin from './components/Admin/Admin';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';
import './index.css'
import {userSelector} from './store/hooks'
import Register from './components/Login/Register';


function App():JSX.Element {

  const {isAuth} = userSelector(state => state.ui)
  return (
  <div className='container'>
    <Navigation />
    <Routes >
      <Route element = {<Home />} path = '/'/>
      {isAuth && <Route  path = '/reg' element = {<Navigate replace to={'/'} />} />}
      {isAuth && <Route path='/login' element = {<Navigate replace to={'/'} />} />}
      {!isAuth && <Route element = {<Login/>} path='/login'/>}
      {!isAuth && <Route element = {<Register/>} path='/reg'/>}
      {isAuth && <Route element  = {<Admin />} path= '/contacts' />}
      {!isAuth && <Route path='/contacts' element = {<Navigate replace to = "/login"/>}/>}
    </Routes>
  </div>
    
  );
}

export default App;
