import './Login.css'

const Login = () => {
    return (
        <div id="loginpage">
            <div id="login">
                <form id='loginform'  >
                    <div id="loginaccount">
                        <div id="loginyouraccount">LOGIN YOUR ACCOUNT</div>
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
                    </div>
                </form>
            </div>
            <br />
            <div id="signupoption">
                <div id='already'> Don't have an account? </div>
                <a href="/signup"> Sign Up </a>
            </div>
        </div>
    )
};

export default Login;
