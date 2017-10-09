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
        this.authHandler = this.authHandler.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            places: {},
            showEditPlaceForm: false,
            editPlace: null,
            uid: null,
            owner: null
        };
    }

    // compoment mounts

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.authHandler({user});
            }
        })
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


    // login system

    authenticate(provider) {
        firebase.auth().signInWithPopup(provider).then( (authData) => {
            this.authHandler(authData);
        }).catch((error) => {
            // console.log(error)
            return;
        });
    }

    authHandler(authData) {
        const rootRef = firebase.database().ref();

        rootRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};

            if(!data.owner) {
                rootRef.set({
                    owner: authData.user.uid
                });
            }

            this.setState({
                uid: authData.user.uid,
                owner: data.owner || authData.user.uid
            })
        })
    }

    logout() {
        firebase.auth().signOut();
        // firebase.auth().currentUser();
        this.setState({ uid: null });
    }


    // other functions 

    addPlace(place) {
        const places = {...this.state.places};
        const timestamp = Date.now();
        places[`place-${timestamp}`] = place;
        this.setState({ places });
    }
    
    toggleEditPlace(e, place) {
        e.stopPropagation();

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

    removePlace(e, key) {
        e.stopPropagation();

        const places = {...this.state.places};
        places[key] = null;
        this.setState({ places });
    }

    render () {
        const siteTitle = "THE MOMENT OF CAPTURE";

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
                            uid={this.state.uid}
                            owner={this.state.owner}
                        />)
                    }
                </ul>
                <AddPlaceForm
                    addPlace={this.addPlace}
                    authenticate={this.authenticate}
                    authHandler={this.authHandler}
                    uid={this.state.uid}
                    logout={this.logout}
                    owner={this.state.owner}
                />

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