import React from 'react';


class Place extends React.Component {
    constructor() {
        super();
        this.goToPlace = this.goToPlace.bind(this);
    }

    goToPlace() {
        const placeId = this.props.details.name;
        this.context.router.transitionTo(`/place/${placeId}`)
    }

    render() {
        const {details, index} = this.props;

        return (
            <div className="place" onClick={this.goToPlace}>
                <h1 className="place-title">{details.name}</h1>
                <p className="place-desc">{details.desc}</p>
                <img src={details.image} alt={details.name} className="place-img"/>
                <div className="tools">
                    <button onClick={() => this.props.toggleEditPlace(index)}>Edit</button>
                    <button onClick={() => this.props.removePlace(index)}>Delete</button>
                </div>
            </div>
        )
    }
}

Place.contextTypes = {
    router: React.PropTypes.object
}

export default Place;