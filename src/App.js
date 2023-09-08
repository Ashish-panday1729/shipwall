import React, { useContext } from 'react'
import Header from './Components/Header'
import Register from './Components/Register'
import Login from './Components/Login'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Error from './Components/Error'
import Context, { LoginContext } from './Components/ContextProvider/Context'
import RegisterUser from './pages/register/RegisterUser'
import Profile from './pages/profile/Profile'
import Home from './pages/home/Home'
import Edit from './pages/edit/Edit'


import "./assets/css/bootstrap.min.css"
import "./assets/css/animate.css"
import "./assets/css/dataTables.bootstrap4.min.css"
import "./assets/plugins/fontawesome/css/fontawesome.min.css"
import "./assets/plugins/fontawesome/css/all.min.css"
import "./assets/css/style.css"
import Sidebar from './Components/sidebar/Sidebar'
import { Hidden } from '@mui/material'
import SpaceCover from './SpaceCover'



const App = () => {
  const { loginData, setLoginData } = useContext(LoginContext);
  return (
    <>

      <Context>
        <Header />
        <Sidebar />
        <div className='page-wrapper'>
          <div className='content'>
            <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/dash' element={<Dashboard />} />
              <Route path='*' element={<Error />} />

              <Route path='/' element={<SpaceCover />} />

              {/* Admin Controller routes starts here */}
              <Route path='register-user' element={<RegisterUser />} />
              <Route path='edit-user/:id' element={<Edit />} />
              <Route path='user-profile/:id' element={<Profile />} />
              <Route path='home-page' element={<Home />} />
            </Routes>
          </div>
        </div>
      </Context>
    </>
  )
}

export default App
