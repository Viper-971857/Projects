import React, { Fragment } from 'react'
import './Login.scss'

const Login = () => {
  return (
    <Fragment className="body">

<div className="main ">

<div className="title-text">

    <div className="title login">login form</div>
    <div className="title sign-up">signup form</div>
    
</div>


<div className="form-container">

    <div className="slide">

        <input type="radio" name="move" id="login" checked />
        <input type="radio" name="move" id="signup" />

        <label for="login" className="slider login">login</label>
        <label for="signup" className="slider signup">sign-up</label>

        <div className="slide-tab"></div>
        
    </div>

    <div className="inner">

        <form action="#" className="login">
            
            <div className="field">
                <input type="text" placeholder="enter your name" required maxlength="12" />
            </div>

            <div className="field">
                <input type="password" placeholder="password" required minlength="4" maxlength="12" />
            </div>

            <div className="pass-link">
                <a href="#">forgot password?</a>
            </div>

            <div className="field">
                <input type="submit" value="login" />
            </div>

            <div className="signup-link">
                not a member?
                <a href="#">signup now</a>
            </div>

        </form>


        <form action="#" className="signup">
            
            <div className="field">
                <input type="text" placeholder="enter your name" required />
            </div>

            <div className="field">
                <input type="password" placeholder="password" required />
            </div>

            <div className="field">
                <input type="password" placeholder="confirm password" required />
            </div>

            <div className="pass-link">
                <a href="#">forgot password?</a>
            </div>

            <div className="field">
                <input type="submit" value="sign-up"/>
            </div>

        </form>

        
    </div>
    
</div>

</div>


    </Fragment>
  )
}

export default Login