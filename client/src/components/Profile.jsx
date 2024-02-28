import axios from "axios"
import { UserContext } from "../App"
import { useContext, useState, useEffect } from "react"
import {Link} from "react-router-dom"
import { Navigate } from 'react-router-dom';




function Profile() {
    const [user] = useContext(UserContext)

    const [posts, setPosts] = useState([])
    const [handle, setHandle] = useState(true)

    const [showUpdate, setShowUpdate] = useState(false)

    const [updatedTitle, setUpdatedTitle] = useState("")
    const [updatedContent, setUpdatedContent] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/user/`)
                console.log(response)

                if (response.status === 200) {
                    const allPosts = response.data
                    console.log(allPosts)
                    setPosts(allPosts)
                }
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
    }, [handle])

    const handlePublish = async (postId) => {
        try {
            await axios.patch(`http://localhost:3000/post/publish/${postId}`, {postId})
            setHandle(!handle)
        } catch(err) {
            console.log(err)
        }
    }

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:3000/post/delete/${postId}`, {postId})
            setHandle(!handle)
        } catch(err) {
            console.log(err)
        }
    }

    const showForm = () => {
        setShowUpdate(!showUpdate)
    }

    const handleUpdate = async (e, postId) => {
        e.preventDefault()
        try {
            await axios.patch(`http://localhost:3000/post/update/${postId}`, {postId, updatedTitle, updatedContent})
            setHandle(!handle)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Hello {user}!</h1>
            {posts.map((post) => (
                // Check if the post's user matches the current user
                post.user.username === user && (
                    <div key={post._id}>
                        <h3>{post.title}</h3>
                        <h4>{post.content}</h4>
                        <h5>{post.date_formatted}</h5>
                        <button onClick={() => handlePublish(post._id)}>{post.published ? "Unpublish" : "Publish"}</button>
                        <button onClick={() => handleDelete(post._id)}>Delete Post</button>
                        <button onClick={() => showForm()}>Update</button>
                        {showUpdate && (
                            <form onSubmit={(e) => handleUpdate(e, post._id)}>
                                <label>Title</label>
                                <input type="text" id="titleValue" defaultValue={post.title} onChange={(e) => setUpdatedTitle(e.target.value)}></input>
                                <label>Content</label>
                                <input id="contentValue" defaultValue={post.content} onChange={(e) => setUpdatedContent(e.target.value)}></input>
                                <button type="submit">Submit Update</button>
                            </form>
                        )}
                    </div>
                )
            ))}
            {!user && (
                <Navigate to="/"></Navigate>
            )}
            <Link to="/">Home</Link>
        </div>
    )
}

export default Profile