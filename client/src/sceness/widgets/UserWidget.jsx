import React,{
    useState,
    useEffect
} from 'react'
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    EmailOutlined
} from '@mui/icons-material'
import { 
    Box,
    Typography,
    Divider,
    useTheme
} from '@mui/material'
import UserImage from '../../components/UserImage'
import FlexBetween from '../../components/FlexBetween'
import Widgetwraper from '../../components/Widgetwraper'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import png from '../../assets/twitter.png'


const UserWidget = ({userId,picturepath}) => {

    const [user,setUser] = useState(null)
    const {palette} = useTheme()
    const navigate = useNavigate()
    const token = useSelector((state)=>state.token)
    const dark = palette.neutral.dark
    const medium = palette.neutral.medium
    const main = palette.neutral.main


    const getUser = async()=>{
        const response = await fetch(`http://localhost:3001/users/${userId}`,{
            method:"GET",
            headers:{Authorization:`Bearer ${token}`}
        })

        const data = await response.json()
        setUser(data)
    }

    useEffect(()=>{
        getUser()
    },[])

    if(!user){
        return null
    }

    const {
        firstName,
        lastName,
        email,
        location,
        occupation,
        viewesProfile,
        impression,
        friends,
        picturePath
    } = user

  return (
    <Widgetwraper>
        <FlexBetween 
        gap=".5rem"
        pb='1.1rem'
        onClick={()=>navigate(`/profile/${userId}`)}
        >
            {/* first row  */}
            <FlexBetween
            gap="1rem"
            >
                <UserImage image={picturePath} />
                <Box>
                    <Typography
                    variant='h4'
                    color={dark}
                    fontWeight="500"
                    sx={{
                        "&:hover":{
                            color:palette.primary.light,
                            cursor:"pointer"
                        }
                    }}
                    >
                        {firstName} {lastName}
                    </Typography>
                    <Typography color={medium}>{friends.length} friends</Typography>
                </Box>
            </FlexBetween>
                    <ManageAccountsOutlined/>
</FlexBetween>
            <Divider/>
            {/* Second row  */}

            <Box p="1rem 0"> 
                    <Box display="flex" alignItems="center" gap="1rem" mb=".5rem">
                        <LocationOnOutlined fontSize="large" sx={{color:main}}/>
                        <Typography color={medium}>{location}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap="1rem" mb=".5rem">
                        <WorkOutlineOutlined fontSize="large" sx={{color:main}}/>
                        <Typography color={medium}>{occupation}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap="1rem">
                        <EmailOutlined fontSize="large" sx={{color:main}}/>
                        <Typography color={medium}>{email}</Typography>
                    </Box>
            </Box>
<Divider/>
            {/* Third Row  */}
            <Box p="1rem 0rem">
                <FlexBetween mb=".5rem">
                    <Typography color={medium}>Who's viewed your profile</Typography>
                    <Typography color={main} fontWeight='500'>{viewesProfile}</Typography>
                </FlexBetween>
                <FlexBetween mb=".5rem">
                    <Typography color={medium}>Impression of your post</Typography>
                    <Typography color={main} fontWeight='500'>{impression}</Typography>
                </FlexBetween>
            </Box>
<Divider/>
            {/* Fourth Row  */}
            <Box p='1rem 0'>
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Social Profile
                </Typography>

                <FlexBetween gap='1rem' mb='.5rem'>
                    <FlexBetween gap="1rem">
                        <img src="../../assets/twitter.png"/>
                        <Box>
                            <Typography color={main} fontWeight="500">Twitter</Typography>
                            <Typography color={medium}>Social NetWorks</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{color:main}}/>
                </FlexBetween>
                
                <FlexBetween gap='1rem'>
                    <FlexBetween gap="1rem">
                        <img src="../../assets/linkedin.png"/>
                        <Box>
                            <Typography color={main} fontWeight="500">Linkedin</Typography>
                            <Typography color={medium}>NetWork Platform</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{color:main}}/>
                </FlexBetween>

            </Box>

        
    </Widgetwraper>
  )
}

export default UserWidget
