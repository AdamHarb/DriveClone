import './Signup.css'

const Signup = () => {
    return (
        <div id="signuppage">
            <div id="signup">
                <div id="signupaccount">
                    <div id="createyouraccount"> CREATE YOUR ACCOUNT</div>
                    <div class="fields">
                        <label for="email">Email</label>
                        <input  type="text" id="email" name="email" />
                    </div>

                    <div class="fields">
                        <label for="password"> Password</label>
                        <input type="password" id="password" name="password" />
                    </div>

                    <div class="fields">
                        <label for="confirmpassword">Confirm Password</label>
                        <input  type="password" id="confirmpassword" name="confirmpassword" />
                    </div>

                    <button class="button" id="signupbutton"> Sign up</button>
                </div>

            </div>

            <br />


            <div id="signinoption">
                <div id='already'> Already have an account ? </div>

                <button class="button" id="signinbutton"> Sign In  </button>
            </div>
        </div>
    )
};

export default Signup;
