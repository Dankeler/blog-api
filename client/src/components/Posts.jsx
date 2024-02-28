import { useContext, useState } from "react"
import {UserContext} from "../App"
import { useEffect } from "react"
import axios from "axios"
import {Link} from "react-router-dom"

function Posts() {
    const [user] = useContext(UserContext)
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])

    const [comment, setComment] = useState("")

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get("http://localhost:3000/posts")
    
                if (response.status === 200) {
                    console.log(response)
                    const {allComments, allPosts} = response.data
                    setPosts(allPosts)
                    setComments(allComments)
                }
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
    }, [comments])

    const handleSubmit = async (e, postId) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:3000/comment/create", {comment, postId, user})
            if (response.status === 200) {
                setComments([...comments, response.data])
            }
        } catch(err) {
            console.log(err)
        }
    }


    return (
        <div>
            <h1>{user}</h1>
            {posts && posts.map((post) => (
                post.published && (
                    <div key={post._id}>
                        <h1>{post.user.username}: {post.title}</h1>
                        <h6>{post.date_formatted}</h6>
                        {comments.filter(comment => comment.post === post._id).map((comment) => (
                            <h3 key={comment._id}>{comment.user.username}: {comment.content} {comment.date_formatted}</h3>
                        ))}
                        {user ? (
                            <form onSubmit={(e) => handleSubmit(e, post._id)}>
                                <label htmlFor="commentText">Comment</label>
                                <input type="text" id="commentText" onChange={(e) => setComment(e.target.value)} />
                                <input type="hidden" name="postId" value={post._id} />
                                <button type="submit">Submit Comment</button>
                            </form>
                        ) : null}
                    </div>
                )
            ))}
            <Link to="/">Home</Link>
        </div>
    );
    
}

export default Posts