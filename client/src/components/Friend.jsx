import React from 'react'
import { 
    PersonAddOutlined,
    PersonRemoveOutlined
} from "@mui/icons-material";
import { 
    Box,
    useTheme,
    Typography,
    IconButton
} from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import FlexBetween from './FlexBetween.jsx';
import UserImage from '../components/UserImage.jsx'
import { useNavigate } from "react-router-dom";
import { setFriends } from '../state/index.js';

const Friend = ({
    friendId,
    name,
    subTitle,
    userPicturePath
}) => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {_id} = useSelector((state)=>state.user)
    const token = useSelector((state)=>state.token)
    const friends = useSelector((state)=>state.user.friends)

    const {palette} = useTheme()
    const primaryLight = palette.primary.light
    const primaryDark = palette.primary.dark
    const main = palette.neutral.main
    const medium = palette.neutral.medium

    const isFriend = friends.find((friend)=>friend._id === friendId)

    const patchFriend=async()=>{
        const response = await fetch(
            `http://localhost:3001/users/${_id}/${friendId}`,{
                method:"PATCH",
                headers:{
                    Authorization:`Bearer ${token}`,
                    "Content-Type":"application/json"
                }
            }
        );

        const data = await response.json()
        dispatch(
            setFriends({
                friends:data
            })
        );
    }

  return (
    <FlexBetween>
        <FlexBetween gap='1rem' >
            <UserImage image={userPicturePath} size='55px'/>
            <Box onClick={()=>{
                navigate(`/profile/${friendId}`)
                navigate(0)
            }} >
                 <Typography
                 color={main}
                 variant='h5'
                 sx={{
                    "&:hover":{
                        color:palette.primary.light,
                        cursor: 'pointer',
                    }
                 }}
                 >
                    {name}
                 </Typography>
                 <Typography color={medium} fontSize=".75rem" >{subTitle}</Typography>
            </Box>
        </FlexBetween>

        <IconButton
        onClick={()=>patchFriend()}
        sx={{
            backgroundColor:primaryLight,
            p:".6rem"
        }}
        >
            {isFriend ?(
                <PersonRemoveOutlined sx={{color:primaryDark}} />
            ):(
                <PersonAddOutlined sx={{color:primaryDark}} />
            )}
        </IconButton>
    </FlexBetween>
  )
}

export default Friend
