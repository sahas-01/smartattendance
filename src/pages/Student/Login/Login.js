import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';

function LoginPage() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    let loginURL = window.location.href;
    console.log(loginURL);
    let studentId = loginURL.split("/")[5];
    console.log(studentId);
    async function loginUser(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName,
                password,
            }),
        })

        const data = await response.json()
        if (data.user) {
            localStorage.setItem('token', data.user)
            alert('Login successful')
            history.push(`/user/home/${studentId}`)
        } else {
            alert('Please check your username and password')
        }
    }

    return (

        <div
            style={{
                background: "#081220",
                height: "100vh",
                // width: "calc(100vw - 15px)",
                overflow: "hidden",
                backgroundPosition: "bottom",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                display: "flex",
                alignItems: "center",
                alignContent: "center",
            }}
        >
            Login
            <div class="login-box">
                <h2>Login to Get Started</h2>
                <form class="auth" onSubmit={loginUser}>
                    <div class="user-box">
                        <input type="text"
                            name=""
                            required={true}
                            placeholder="Username"
                            id="uid"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />

                    </div>
                    <div class="user-box">
                        <input type="password"
                            name=""
                            required={true}
                            placeholder="Password"
                            id="pass"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>

                    <br />

                    <input type="submit" value="Submit" id="auth" />
                </form>
            </div>
        </div>
    )
}

export default LoginPage;