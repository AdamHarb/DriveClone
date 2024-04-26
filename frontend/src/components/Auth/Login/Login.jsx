import './Login.css'
import {useState} from "react";
import axios from "axios";

const Login = () => {


    const handleLogin = async (event) => {
        event.preventDefault();
        let formData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        };
        try {
            const response = await axios.post('http://localhost:3000/api/login', formData);
            console.log(response.data);
        } catch (error) {
            console.error('Error during login:', error);
        }
    }
    return (
        <div id="loginpage">
            <div id="login">
                <form id='loginform'  >
                    <div id="loginaccount">
                        <div id="loginyouraccount">LOGIN TO YOUR ACCOUNT</div>
                        <div class="fields">
                            <label for="email">Email</label>
                            <input type="text" id="email" name="email" />
                        </div>
                        <div class="fields">
                            <label for="password"> Password</label>
                            <input type="password" id="password" name="password" />
                        </div>
                        <button class="button" id="loginbutton" onClick={handleLogin}> Log In</button>
                    </div>
                </form>
            </div>
            <br />
            <div id="signupoption">
                <div id='already'>Don't have an account?&ensp;</div>
                <a href="/signup"> Sign Up </a>
            </div>
        </div>
    )
};

export default Login;
