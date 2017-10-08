import React from 'react';


class Place extends React.Component {
    constructor() {
        super();
        this.goToPlace = this.goToPlace.bind(this);
        this.renderTools = this.renderTools.bind(this);
    }

    goToPlace() {
        const placeId = this.props.details.name;
        this.context.router.transitionTo(`/place/${placeId}`)
    }


    renderTools() {
        const {index} = this.props;

        return (
            <div className="tools">
                <button onClick={(e) => this.props.toggleEditPlace(e, index)}>Edit</button>
                <button onClick={(e) => this.props.removePlace(e, index)}>Delete</button>
            </div>
        )
    }


    render() {
        const {details} = this.props;

        return (
            <div className="place" onClick={this.goToPlace}>
                <h1 className="place-title">{details.name}</h1>
                <p className="place-desc">{details.desc}</p>
                <img src={details.image} alt={details.name} className="place-img"/>
                
                { 
                    this.props.uid === this.props.owner
                    &&
                    this.renderTools()
                }
                
            </div>
        )
    }
}

Place.contextTypes = {
    router: React.PropTypes.object
}

export default Place;