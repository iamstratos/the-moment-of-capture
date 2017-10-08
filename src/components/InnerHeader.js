import React from 'react';


const InnerHeader = (props) => {
    return (
       <header>
           <h2 className="innerheader-city-title">{props.tagline}</h2>
       </header>
    )
}


export default InnerHeader;