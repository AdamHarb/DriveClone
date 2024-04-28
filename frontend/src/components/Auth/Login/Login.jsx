import './Login.css'
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

const Login = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const handleLogin = async (event) => {
        event.preventDefault();
        let formData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        };
        try {
            const response = await axios.post('http://localhost:3000/api/login', formData).then((response) => {
                if (response.status === 200) {
                    setCookie('token', response.data.token)
                    navigate('/');
                }
            });

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
                        <button class="button" id="loginbutton"> Log In</button>
                        <div id="two-options">
                            <div id="remember-me">
                                <input type="checkbox" id="rememberMe" name="rememberMe" />
                                <label htmlFor="rememberMe">Remember me</label>
                            </div>
                            <div id="forgot-password">
                                <a href="/forgot-password">Forgot Password?</a>
                            </div>
                        </div>
                        <button class="button" id="loginbutton" onClick={handleLogin}> Log In</button>
                    </div>
                </form>
            </div>
            <br />
            <div id="signupoption">
                <div id='already'>Don&apos;t have an account?&ensp;</div>
                <a href="/signup"> Sign Up </a>
            </div>
        </div>
    )
};

export default Login;
