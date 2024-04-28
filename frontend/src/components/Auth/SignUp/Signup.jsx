import './Signup.css';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const  togglePasswordVisibility = () => {
        event.preventDefault();
        setShowPassword(!showPassword);
    };
    const togglePasswordVisibility1 = () => {
        event.preventDefault();
        setShowPassword1(!showPassword1);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const newFormData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        };


        try {
            const response = await axios.post('http://localhost:3000/api/create-user', newFormData); // Make API request
            console.log(response.data);
            // Handle successful response
            if (response.data.success) {
                setCookie('token', response.data.token);
                navigate('/');
                console.log('Signup successful!'); // Replace with your desired action
            } else {
                // Handle signup errors (e.g., display error messages)
                console.error('Signup failed:', response.data.error); // Replace with error handling
            }
        } catch (error) {
            console.error('Error during signup:', error); // Handle errors during request
        }
    };


    return (
        <div id="signuppage">
            <div id="signup" method='post'>
                <form id="signupform">
                    <div id="signupaccount">
                        <div id="createyouraccount"> CREATE YOUR ACCOUNT</div>
                        <div class="fields">
                            <div id="firstnamefield">
                                <label for="username">Username</label>
                                <input type="username" id="username" name="username"></input>
                            </div>
                        </div>

                        <div class="fields">
                            <input type="text" id="email" name="email" />
                            <label for="email">Email</label>
                        </div>

                        <div class="fields">
                            <input type={showPassword ? 'text' : 'password'}  id="password" name="password" />
                            <div className="password-container">
                                <label for="password"> Password</label>
                                <button  onClick={togglePasswordVisibility} style={{
                                    background: 'none', // Removes background
                                    border: 'none',  // Removes border
                                    padding: 0,      // Removes padding
                                    boxShadow: 'none' // Removes box shadow if any
                                }}>
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </button>

                            </div>
                        </div>

                        <div class="fields">
                            <input type={showPassword1 ? 'text' : 'password'} id="confirmpassword" name="confirmpassword" />
                            <div className="password-container">
                                <label for="confirmpassword">Confirm Password</label>
                                <button onClick={togglePasswordVisibility1}style={{
                                    background: 'none',
                                    border: 'none', 
                                    padding: 0,      
                                    boxShadow: 'none' 
                                }}>
                                  {showPassword1 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </button>
                            </div>
                        </div>

                        <button class="button" id="signupbutton" onClick={handleSubmit}> Sign up</button>
                    </div>
                </form>

            </div>

            <br />


            <div id="signinoption">
                <div id='already'>Already have an account?&ensp;</div>
                <a href="/login"> Sign In </a>
            </div>
        </div>
    )
};

export default Signup;
