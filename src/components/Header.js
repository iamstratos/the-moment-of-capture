import React from 'react';


const Header = (props) => {
    return (
       <header>
           <h1 className="main-title">{props.tagline}</h1>
       </header>
    )
}


export default Header;