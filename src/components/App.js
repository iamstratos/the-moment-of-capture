import React from 'react';
import Header from './Header';
import Place from './Place';
import AddPlaceForm from './AddPlaceForm';
import EditPlaceForm from './EditPlaceForm';

import firebase from '../base';

class App extends React.Component {
    constructor() {
        super();

        this.addPlace = this.addPlace.bind(this);
        this.updatePlace = this.updatePlace.bind(this);
        this.removePlace = this.removePlace.bind(this);
        this.toggleEditPlace = this.toggleEditPlace.bind(this);

        this.state = {
            places: {},
            showEditPlaceForm: false,
            editPlace: null
        };
    }

    componentWillMount() {
        this.ref = firebase.syncState(`places`
            , {
                context: this,
                state: 'places'
            }    
        );
    }

    componentWillUnmount() {
        firebase.removeBinding(this.ref);
    }

    addPlace(place) {
        const places = {...this.state.places};
        const timestamp = Date.now();
        places[`place-${timestamp}`] = place;
        this.setState({ places });
    }
    
    toggleEditPlace(place) {
        const isEditPlaceOpen = this.state.showEditPlaceForm;

        if (isEditPlaceOpen) {
            this.setState({
                showEditPlaceForm: false,
                editPlace: null
            })
        } else {
            this.setState({
                showEditPlaceForm: true,
                editPlace: place
            })
        }
    }

    updatePlace(key, updatedPlace) {
        const places = {...this.state.places};
        places[key] = updatedPlace;
        this.setState({ places });
    }

    removePlace(key) {
        const places = {...this.state.places};
        places[key] = null;
        this.setState({ places });
    }

    render () {
        const siteTitle = "The moment of capture";

        return (
            <div>
                
                <Header 
                    tagline={siteTitle}
                />
                
                <ul className="list-of-places">
                    {
                        Object
                        .keys(this.state.places)
                        .map(key =>
                        <Place
                            key={key}
                            index={key}
                            details={this.state.places[key]}
                            addPlace={this.addPlace}
                            updatePlace={this.updatePlace}
                            removePlace={this.removePlace}
                            toggleEditPlace={this.toggleEditPlace}
                        />)
                    }
                </ul>
                <AddPlaceForm addPlace={this.addPlace} />

                { 
                    this.state.showEditPlaceForm
                    &&
                    <EditPlaceForm
                        places={this.state.places}
                        editPlace={this.state.editPlace}
                        addPlace={this.addPlace}
                        updatePlace={this.updatePlace}
                        toggleEditPlace={this.toggleEditPlace}
                    />
                }
                
            </div>
        )
    }
}

App.propTypes = {
    params: React.PropTypes.object.isRequired
}

export default App;