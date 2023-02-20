import React , { useMemo } from 'react'
import { BrowserRouter , Routes ,Route,Navigate } from 'react-router-dom'
import HomePage from './sceness/homePage/HomePage'
import ProfilePage from './sceness/profilePage/ProfilePage'
import LoginPage from './sceness/loginPage/LoginPage'
// import Navbar from './sceness/navbar/Navbar'
import { useSelector } from 'react-redux'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from './theme.js'
import { CssBaseline,ThemeProvider } from "@mui/material"




const App = () => {

  const mode = useSelector((state)=>state.mode)
  const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode])


  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          {/* <Navbar/> */}
        <Routes>
          <Route path='/' element={<LoginPage/>} />
          <Route path='/home' element={<HomePage/>} />
          <Route path='/profile/:userId' element={<ProfilePage/>} />
        </Routes>
        </CssBaseline>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App