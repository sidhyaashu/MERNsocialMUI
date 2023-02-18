import React ,{useState} from 'react'
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery
} from '@mui/material'

import {
  Search,
  DarkMode,
  LightMode,
  Message,
  Notifications,
  Help,
  Menu,
  Close
} from "@mui/icons-material"

import { useDispatch,useSelector } from 'react-redux'
import { setMode,setLogout } from '../../state/index'
import { useNavigate } from 'react-router-dom'
import FlexBetween from '../../components/FlexBetween'


const Navbar = () => {

  const [isMobileMenuToggled,setIsMobileMenuToggled] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state)=>state.user)
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")

  const theme = useTheme()
  const neutralLight = theme.palette.neutral.light
  const dark = theme.palette.neutral.dark
  const background = theme.palette.background.default
  const primaryLight = theme.palette.primary.light
  const alt = theme.palette.background.alt

  // const fullName = `${user.firstName} ${user.lastName}`

  return (
    <FlexBetween padding=".8rem 6%" backgroundColor={alt} >
      <FlexBetween gap='1.75rem'>
        <Typography
        fontWeight="bold"
        fontSize='clamp(.8rem,1.8rem,2rem)'
        color='primary'
        onClick={()=>navigate('/home')}
        sx={{
          cursor: 'pointer',
          "&:hover":{
            color:primaryLight,
          }
        }}
        >
          Socialpedia
        </Typography>
        {
          isNonMobileScreens &&(
            <FlexBetween
            backgroundColor={neutralLight}
            borderRadius='9px'
            gap="2.2rem"
            padding=".1rem 1.5rem"
            >
              <InputBase placeholder='Search..'/>
              <IconButton>
                <Search/>
              </IconButton>
            </FlexBetween>
          )
        }
      </FlexBetween>
      {
        isNonMobileScreens ?(
          // DeskTopMap 
        <FlexBetween gap="2rem">
          <IconButton onClick={()=>dispatch(setMode())}>
            {
              theme.palette.mode === 'dark'?(
                <DarkMode sx={{fontSize:"25px"}}/>
              ):(
                <LightMode sx={{fontSize:"25px",color:dark}}/>
              )
            }
          </IconButton>
          <Message sx={{fontSize:'20px',cursor: 'pointer',}}/>
          <Notifications sx={{fontSize:'20px',cursor: 'pointer',}}/>
          <Help sx={{fontSize:'20px',cursor: 'pointer',}}/>
          <FormControl variant='standard' value="Sidhya">
            <Select
            value="Sidhya"
            sx={{
              backgroundColor:neutralLight,
              borderRadius:'.25rem',
              width:"150px",
              p:".25rem 1rem",
              "& .MuiSvgIcon-root":{
                pr:".25rem",
                width:'3rem'
              },
              "& .MuiSelect-select:focus":{
                backgroundColor:neutralLight
              }
            }}
            input={<InputBase/>}
            >
              <MenuItem value='Sidhya'>
                <Typography>Sidhya</Typography>
              </MenuItem>
              <MenuItem onClick={()=>dispatch(setLogout())} >Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
        ):(
          // Mobile Nav 

        <IconButton onClick={()=>setIsMobileMenuToggled(!isMobileMenuToggled)}>
          <Menu/>
        </IconButton>
        )
      }
      {
        !isNonMobileScreens && isMobileMenuToggled && (
          <Box
          position="fixed"
          right='0'
          bottom='0'
          height='100%'
          zIndex='10'
          maxWidth="500px"
          minWidth='300px'
          backgroundColor={background}
          >
            <Box display='flex' justifyContent='flex-end' p='1rem'>
              <IconButton onClick={()=>setIsMobileMenuToggled(!isMobileMenuToggled)}>
                <Close/>
              </IconButton>
            </Box>


            <FlexBetween display='flex' flexDirection='column' alignItems='center' gap='1.2rem'>
          <IconButton onClick={()=>dispatch(setMode())}>
            {
              theme.palette.mode === 'dark'?(
                <DarkMode sx={{fontSize:"25px"}}/>
              ):(
                <LightMode sx={{fontSize:"25px",color:dark}}/>
              )
            }
          </IconButton>
          <Message sx={{fontSize:'20px',cursor: 'pointer',}}/>
          <Notifications sx={{fontSize:'20px',cursor: 'pointer',}}/>
          <Help sx={{fontSize:'20px',cursor: 'pointer',}}/>
          <FormControl variant='standard' value="Sidhya">
            <Select
            value="Sidhya"
            sx={{
              backgroundColor:neutralLight,
              borderRadius:'.25rem',
              width:"150px",
              p:".25rem 1rem",
              "& .MuiSvgIcon-root":{
                pr:".25rem",
                width:'3rem'
              },
              "& .MuiSelect-select:focus":{
                backgroundColor:neutralLight
              }
            }}
            input={<InputBase/>}
            >
              <MenuItem value='Sidhya'>
                <Typography>Sidhya</Typography>
              </MenuItem>
              <MenuItem onClick={()=>dispatch(setLogout())} >Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>

          </Box>
        )
      }
    </FlexBetween>
  )
}

export default Navbar
