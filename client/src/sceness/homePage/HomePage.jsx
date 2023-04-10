import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../navbar/Navbar'
import MyPostWidget from '../widgets/MyPostWidget'
import UserWidget from '../widgets/UserWidget'
import PostsWidget from '../widgets/PostsWidget'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const isNonMobile = useMediaQuery("(min-width:1000px)")
  const {_id,picturePath } = useSelector((state)=>state.user)
  const navigate = useNavigate()
  const token  = useSelector((state)=>state.token)
  const user  = useSelector((state)=>state.user)

  console.log("Token-> ",token)
  console.log("User-> ",user)

  return (
    <Box>
      <Navbar/>

      <Box
      width="100%"
      padding="2rem 6%"
      display={isNonMobile?"flex":"block"}
      gap=".5rem"
      justifyContent="space-between"
      >
        <Box flexBasis={isNonMobile?"26%":undefined}>
          <UserWidget userId={_id} picturepath={picturePath} />
        </Box>

        <Box 
        flexBasis={isNonMobile?"46%":undefined}
        mt={isNonMobile?undefined:"2rem"}>
          <MyPostWidget picturepath={picturePath}/>
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobile && <Box flexBasis="26%" ></Box>}
      </Box>

    </Box>
  )
}

export default HomePage
