import React from "react";
import "./About.scss";
import { Button, Typography, Avatar } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import { FaFacebook } from "react-icons/fa";
const About = () => {
  const visitInstagram = () => {
    window.location = "http://instagram.com/viper.1397";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://avatars.githubusercontent.com/u/93073673?v=4"
              alt="Developer Avatar"
            />
            <Typography>Devender Pal</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @DevenderPal.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.facebook.com/people/Devender-Pal/100012446112406/"
              target="blank"
            >
              <FaFacebook className="FacebookSvgIcon" />
            </a>

            <a href="http://instagram.com/viper.1397" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;