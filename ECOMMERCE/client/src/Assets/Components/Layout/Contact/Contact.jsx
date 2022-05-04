import React from "react";
import "./Contact.scss";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:dk2371092@gmail.com">
        <Button>Contact: dk2371092@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;