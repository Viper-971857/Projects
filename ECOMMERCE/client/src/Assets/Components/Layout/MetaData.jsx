// import React from "react";
// import Helmet from 'react-helmet'


// class MetaData extends React.Component{

//     constructor(){
//         super();
//         this.state ={
//             title:undefined
//         }
//     }

//     render(){

//         const {title} = this.state

//         return(
//             <Helmet>

//                 <title>{title}</title>

//             </Helmet>
//         )
//     }
// }


// export default MetaData;


import React from "react";
import Helmet from 'react-helmet';

const MetaData = ({title}) => {
  return (
    <Helmet>
        <title>{title}</title>
    </Helmet>
  )
}

export default MetaData