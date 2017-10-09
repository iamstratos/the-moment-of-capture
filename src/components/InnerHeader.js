import React from 'react';



class InnerHeader extends React.Component {
    constructor() {
        super();
        this.goToPlace = this.goToPlace.bind(this);
    }

    goToPlace() {
        this.context.router.transitionTo(`/`);
    }

    render() {
        return (
           <header>
               <div className="back" onClick={this.goToPlace}>
                   <img src={require('../css/images/back-arrow.svg')} alt="back" />
               </div>
               <h2 className="innerheader-city-title">{this.props.tagline}</h2>
           </header>
        )
    }
}

InnerHeader.contextTypes = {
    router: React.PropTypes.object
}

export default InnerHeader;