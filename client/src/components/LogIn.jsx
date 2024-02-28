/* eslint-disable no-unused-vars */
import React, {useState} from "react"
import {useContext} from "react"
import axios from "axios"
import {UserContext} from "../App"
import { Navigate } from "react-router-dom";

function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useContext(UserContext);


    axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/users/login", { username, password });

            if (response.status === 200) {
                setUser(username)
            } 
        } catch (error) {
            console.error("Error during login:", error);
            // Handle error
        }
    }
 
    return (
        <div className="logInForm">
            <h1>Log In</h1>
            <form method="post" onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" name="username" required onChange={(e) => setUsername(e.target.value)}></input>
                <label htmlFor="password">Password: </label>
                <input type="text" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit">Log In</button>
            </form>
            {user && (
                <Navigate to="/" replace={true}></Navigate>
            )}
        </div>
    )
}

export default LogIn