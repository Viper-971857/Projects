import React from "react";
import Playstore from '../../../Images/playstore.png';
import Appstore from '../../../Images/Appstore.png'
import './Footer.scss'


class Footer extends React.Component{

    render(){
        return(
            <footer id="footer">
            <div className="leftFooter">
              <h4>DOWNLOAD OUR APP</h4>
              <p>Download App for Android and IOS mobile phone</p>
              <img src={Playstore} alt="playstore" />
              <img src={Appstore} alt="Appstore" />
            </div>
      
            <div className="midFooter">
              <h1>ECOMMERCE.</h1>
              <p>High Quality is our first priority</p>
      
              <p>Copyrights 2021 &copy; Devender Pal</p>
            </div>
      
            <div className="rightFooter">

              <h4>Follow Us</h4>
              <a href="http://instagram.com/viper.1397" >Instagram</a>
              <a href="mailto:dk2371092@gmail.com">Email</a>
              <a href="https://www.facebook.com/people/Devender-Pal/100012446112406/">Facebook</a>
            </div>
            
          </footer>
        )
    }

}



export default Footer