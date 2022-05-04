import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsGithub, BsInstagram,BsFillEnvelopeFill} from 'react-icons/bs'
import './Footer.css'

const Footer = () => {
  return (

    <div className='footer' >

    <div>

        <Typography variant="h5" >About Me</Typography>

        <Typography>
          Hey, my name is Devender Pal. I am a Full-Stack Developer.
        </Typography>

        <Link to="/contact" className="footerContactBtn" >
            <Typography>Contact Us</Typography>
        </Link>

        <Typography>
          Devender &#169; 2022. All Rights Reserved.
        </Typography>

    </div>

    <div>

      <Typography variant="h6" >Social Media</Typography>

      <a href="https://github.com/Viper-971857" target="blank" > 
        {/* <i class='bx bxl-github'></i> */}
        <BsGithub/>
      </a>

      <a href="https://www.facebook.com/people/Devender-Pal/100012446112406/" target="blank" > 
        <BsFacebook/>
      </a>

      <a href="http://instagram.com/viper.1397" target="blank" > 
        <BsInstagram/>
      </a>

      <a href="mailto:dk2371092@gmail.com" target="blank" > 
      <BsFillEnvelopeFill/>    
      </a>

    </div>

    </div>

  )
}

export default Footer