/* eslint-disable no-unused-vars */
import React, {useState} from "react"

function SignUp() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")



    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            return console.error("chujowe hasla")
        }

        try {
            const response = await fetch("http://localhost:3000/users/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, password})
            })

            console.log(response.status)

            if (response.ok) {
                window.location.href = "/users/login"
            } else {
                window.location.href ="/users/create"
            }

        } catch(err) {
            console.log(err)
        }
    }
 
    return (
        <div className="signUpForm">
            <h1>Sign Up</h1>
            <form method="post" onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" name="username" required onChange={(e) => setUsername(e.target.value)}></input>
                <label htmlFor="password">Password: </label>
                <input type="text" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}></input>
                <label htmlFor="confirmPassword">Confirm password: </label>
                <input type="text" id="confirmPassword" name="confirmPassword" required onChange={(e) => setConfirmPassword(e.target.value)}></input>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp