import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../navbar/Navbar'
import MyPostWidget from '../widgets/MyPostWidget'
import UserWidget from '../widgets/UserWidget'

const HomePage = () => {
  const isNonMobile = useMediaQuery("(min-width:1000px)")
  const {_id,picturePath } = useSelector((state)=>state.user)

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
        </Box>
        {isNonMobile && <Box flexBasis="26%" ></Box>}
      </Box>

    </Box>
  )
}

export default HomePage
