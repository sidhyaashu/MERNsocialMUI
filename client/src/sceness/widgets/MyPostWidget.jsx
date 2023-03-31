import React ,{useState} from 'react'
import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined
} from "@mui/icons-material"
import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery
} from "@mui/material"
import FlexBetween from '../../components/FlexBetween'
import UserImage from '../../components/UserImage'
import Widgetwraper from '../../components/Widgetwraper'
import Dropzone from 'react-dropzone'
import { useDispatch,useSelector } from 'react-redux'
import { setPosts } from '../../state'



const MyPostWidget = ({picturepath}) => {
    const dispatch = useDispatch()
    const [isImage,setIsImage] = useState(false)
    const [image,setImage] = useState(null)
    const [post,setPost] = useState("")
    const {palette} = useTheme()
    const {_id} = useSelector((state)=>state.user)
    const token = useSelector((state)=>state.token)
    const isNonMobileScreen = useMediaQuery("(min-width:1000px)")
    const mediumMain = palette.neutral.mediumMain
    const medium = palette.neutral.medium


    
    const handlePost = async()=>{
        const formData = new FormData()
        formData.append("userId",_id)
        formData.append("description",post)

        if(image){
            formData.append("picture",image)
            formData.append("picturePath",image.name)
        }

        const response = await fetch(`http://localhost:3001/posts`,{
            method:"POST",
            headers:{
                Authorization:`Bearer ${token}`
            },
            body:formData
        })

        const posts = await response.json()
        dispatch(setPosts({posts}))
        setImage(null)
        setPost("")
    }


  return (
    <Widgetwraper>
        <FlexBetween gap="1.5rem">
            <UserImage image={picturepath}/>
            <InputBase
            placeholder='Whats on your mind'
            value={post}
            onChange={e=>setPost(e.target.value)}
            sx={{
                width:'100%',
                backgroundColor:palette.neutral.light,
                borderRadius:"2rem",
                padding:"1rem 2rem"
            }}
            />
        </FlexBetween>
      {isImage &&(
        <Box 
        border={`1px solid ${medium}`}
        borderRadius="5px"
        mt="1rem"
        p="1rem"
        >
            <Dropzone
                            acceptedFiles='.jpg,.jpeg,.png'
                            multiple={false}
                            onDrop={(acceptedFiles)=>setImage('picture',acceptedFiles[0])}
                            >
                                {({
                                    getRootProps,getInputProps
                                })=>(
                                    <FlexBetween>
                                    <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p='1rem'
                                    width="100%"
                                    sx={{"&:hover":{cursor:'pointer'}}}
                                    >
                                        <input {...getInputProps()} />
                                        {!image?(
                                            <p>Add Image here</p>
                                        ):(
                                            <FlexBetween>
                                                <Typography>{image.name}</Typography>
                                                <EditOutlined/>
                                            </FlexBetween>
                                        )}

                                    </Box>
                                    {image && (
                                        <IconButton
                                        onClick={()=>setImage(null)}
                                        sx={{width:"15%"}}
                                        >
                                            <DeleteOutlined/>
                                        </IconButton>
                                    )}
                                    </FlexBetween>
                                )}
                            </Dropzone>
        </Box>
      )}
      <Divider sx={{margin:"1.25rem 0"}}/>

      <FlexBetween>
        <FlexBetween gap=".25rem" onClick={()=>setIsImage(!isImage)}>
            <ImageOutlined sx={{color:mediumMain}}/>
            <Typography 
                color={mediumMain}
                sx={{"&:hover":{cursor:"pointer",color:medium}}}>
                    Image
                </Typography>
        </FlexBetween>
        {
            isNonMobileScreen?(
                <>
                <FlexBetween gap=".25rem">
                    <GifBoxOutlined sx={{color:mediumMain}}/>
                    <Typography color={mediumMain}>Clip</Typography>
                </FlexBetween>

                <FlexBetween gap=".25rem">
                    <AttachFileOutlined sx={{color:mediumMain}}/>
                    <Typography color={mediumMain}>Attach</Typography>
                </FlexBetween>
                
                <FlexBetween gap=".25rem">
                    <MicOutlined sx={{color:mediumMain}}/>
                    <Typography color={mediumMain}>Audio</Typography>
                </FlexBetween>
                </>
            ):(<FlexBetween>
                <MoreHorizOutlined sx={{color:mediumMain}}/>
            </FlexBetween>)
        }

        <Button 
        disabled={!post}
        onClick={handlePost}
        sx={{
            color:palette.background.alt,
            backgroundColor:palette.primary.main,
            borderRadius:"3rem"
        }}
        >
            POST
        </Button>
      </FlexBetween>
    </Widgetwraper>
  )
}

export default MyPostWidget
