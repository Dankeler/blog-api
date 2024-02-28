import { useContext } from 'react';
import {UserContext} from "../App"
import {Link} from "react-router-dom"
import axios from 'axios';

function Index() {
    const [user, setUser] = useContext(UserContext)
    const handleLogOut = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:3000/users/logout")
        setUser(null)
    }

    return (
        <div>
            <h1>{user ? `Welcome ${user}` : 'Welcome Guest'}</h1>
            {!user && (
                <div>
                <Link to="/users/login">Log In</Link>
                <br></br>
                <Link to="/users/create">Sign Up</Link>
                </div>
            )}
            <br></br>
            <Link to="/posts">Go to Posts</Link>
            <br></br>
            {user && (
                <Link to="/user">Go to Profile</Link>
            )}
            {user && (
                <form onSubmit={handleLogOut}>
                <input type='hidden'></input>
                <button type='submit'>Log Out</button>
                </form>
            )}
        </div>
    );
}

export default Index;
