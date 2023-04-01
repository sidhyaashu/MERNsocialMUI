import React ,{useState} from 'react'
import { 
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined
} from "@mui/icons-material";
import { 
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme
} from "@mui/material";
import FlexBetween from '../../components/FlexBetween'
import Friend from '../../components/Friend';
import  Widgetwraper  from "../../components/Widgetwraper.jsx";
import { useDispatch , useSelector} from 'react-redux';
import {setPost} from '../../state/index.js'



const PostWidget = ({
  postId,
  postUserId,
  location,
  name,
  description,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
    const [isComments,setIsComments] = useState(false)
    const dispatch = useDispatch()
    const token = useSelector((state)=>state.token)
    const loggedInUserId = useSelector((state)=>state.user._id)
    const isLiked = Boolean(likes[loggedInUserId])
    const likeCount = Object.keys(likes).length

    const {palette} = useTheme()
    const primary = palette.primary.main
    const main = palette.neutral.main


    const patchLike = async()=>{
      const response = await fetch(
        `http://localhost:3001/posts/${postId}/like`,
        {
          method:"PATCH",
          headers:{
            Authorization:`Bearer ${token}`,
           "Content-Type":"application/json"
          },
          body:JSON.stringify({userId:loggedInUserId})
        }
      );
      const updatedPost = await response.json()

      dispatch(
        setPost({
          post:updatedPost
        })
      );
    };

  return (
    <Widgetwraper m="2rem 0">
      <Friend
      friendId={postUserId}
      name={name}
      subTitle={location}
      userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{marginTop: "1rem",}} >
        {description}
      </Typography>
        {picturePath && (
          <img
          width="100%"
          height="auto"
          alt="post"
          style={{
            borderRadius:".75rem",
            marginTop: ".75rem",
          }}
          src={`http://localhost:3001/assets/${picturePath}`}
          />
        )}
        <FlexBetween mt=".25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap=".3rem">

              <IconButton onClick={patchLike}>
                {isLiked ?(
                  <FavoriteOutlined sx={{color:primary}} />
                ):(
                  <FavoriteBorderOutlined  />
                )}
              </IconButton>
              <Typography>
                  {likeCount}
              </Typography>
            </FlexBetween>
            
            <FlexBetween gap=".3rem" >
                  <IconButton onClick={()=>setIsComments(!isComments)} >
                    <ChatBubbleOutlineOutlined/>
                  </IconButton>
                  <Typography>
                    {comments.length}
                  </Typography>
            </FlexBetween>
          </FlexBetween>
          <IconButton>
            <ShareOutlined/>
          </IconButton>
        </FlexBetween>
        {
          isComments && (
            <Box mt=".5rem">
              {comments.map((comments,i)=>(
                <Box key={`${name}-${i}`} >
                  <Divider/>
                  <Typography sx={{color:main,m:".5rem 0",pl:"1rem"}}>
                    {comments}
                  </Typography>
                </Box>
              ))}
              <Divider/>
            </Box>
          )
        }
    </Widgetwraper>
  )
}

export default PostWidget
