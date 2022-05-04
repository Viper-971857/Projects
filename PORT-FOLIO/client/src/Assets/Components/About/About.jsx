import { Typography } from '@mui/material';
import React from 'react';
import './About.css'

const About = () => {
  return (

    <div className='about' >

        <div className="aboutContainer" >

            <Typography style={{textTransform:"capitalize"}}>We focus on 100% Client satisfaction and Ready to help them anytime &#128151;. </Typography>

        </div>

        <div className="aboutContainer2" >

            <div>

                <img className="aboutAvatar" src="https://avatars.githubusercontent.com/u/93073673?v=4" alt="Devender Pal"/>

                <Typography variant="h4" style={{
                    margin:"1vmax",color:"#000000"
                    }} >Devender Pal</Typography>

                <Typography>FULL STACK DEVELOPER</Typography>

                <Typography style={{margin:"1vmax 0",textAlign:"center"}}>MERN TECHNOLOGY</Typography>

            </div>

            <div>

                <Typography className='discription' style={{
                    wordSpacing:"5px",
                    lineHeight:"50px",
                    letterSpacing:"5px",
                    textAlign:"right"
                }} >Hello, I am Devender Pal and I am a Full Stack Developer &#128512;.I develop things with Love and Passion &#128151;.</Typography>

            </div>

        </div>

    </div>

  )
}

export default About