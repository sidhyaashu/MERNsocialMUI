import React ,{useEffect} from 'react'
import { useDispatch,useSelector } from "react-redux";
import PostWidget from './PostWidget.jsx';
import { setPosts } from '../../state/index.js';



const PostsWidget = ({userId,isProfile=false}) => {

    const dispatch = useDispatch()
    const posts = useSelector((state)=>state.posts)
    const token = useSelector((state)=>state.token)

    const getPosts = async()=>{
        const response = await fetch("http://localhost:3001/posts",{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        });

        const data = response.json();

        dispatch(
            setPosts({
                posts:data
            })
        );
    };

    const getUserPosts = async()=>{
        const response = await fetch(`http://localhost:3001/posts/${userId}/posts`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        });

        const data = response.json();

        dispatch(
            setPosts({
                posts:data
            })
        );
    };


    useEffect(()=>{
        if(isProfile){
            getUserPosts()
        }else{
            getPosts()
        }
    },[])

  return (
    <>
    {posts.map(
        ({
            _id,
            userId,
            firstName,
            lastName,
            location,
            description,
            picturePath,
            userPicturePath,
            likes,
            comments
        })=>(
            <PostWidget
                key={_id}
                postId={_id}
                postUserId={userId}
                location={location}
                name={`${firstName} ${lastName}`}
                description={description}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
            />
        )
    )}

    </>
  )
}

export default PostsWidget


//original
    /* {posts.map(
        ({
            _id,
            userId,
            firstName,
            lastName,
            location,
            description,
            picturePath,
            userPicturePath,
            likes,
            comments
        })=>(
            <PostWidget
                key={_id}
                postId={_id}
                postUserId={userId}
                location={location}
                name={`${firstName} ${lastName}`}
                description={description}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
            />
        )
    )} */