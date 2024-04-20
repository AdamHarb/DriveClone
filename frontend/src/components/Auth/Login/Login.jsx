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
                    </div>
                </form>
            </div>
            <br />
            <div id="signupoption">
                <div id='already'> Don't have an account? </div>
                <button class="button" id="signupbutton"> Sign Up </button>
            </div>
        </div>
    )
};

export default Login;
