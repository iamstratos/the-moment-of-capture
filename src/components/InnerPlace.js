import React from 'react';
import InnerHeader from './InnerHeader';
import MainPhoto from './MainPhoto';
import AddPhotoForm from './AddPhotoForm';
import EditPhotoForm from './EditPhotoForm';
import firebase from '../base';

class InnerPlace extends React.Component {
    constructor() {
        super();
        
        this.addPhoto = this.addPhoto.bind(this);
        this.updatePhoto = this.updatePhoto.bind(this);
        this.removePhoto = this.removePhoto.bind(this);
        this.toggleEditPhoto = this.toggleEditPhoto.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            places: {},
            photos: {},
            showEditPhotoForm: false,
            uid: null,
            owner: null
        }
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
        
        this.ref = firebase.syncState(`photos`
            , {
                context: this,
                state: 'photos'
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
        const storeRef = firebase.database().ref();

        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};

            if(!data.owner) {
                storeRef.set({
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
        // firebase.auth();
        this.setState({ uid: null });
    }


    // other functions 

    addPhoto(photo) {
        const photos = {...this.state.photos};
        const timestamp = Date.now();
        photos[`photo-${timestamp}`] = photo;
        this.setState({ photos });
    }

    toggleEditPhoto(photo) {
        const isEditPhotoOpen = this.state.showEditPhotoForm;

        if (isEditPhotoOpen) {
            this.setState({
                showEditPhotoForm: false,
                editPhoto: null
            })
        } else {
            this.setState({
                showEditPhotoForm: true,
                editPhoto: photo
            })
        }
    }

    updatePhoto(key, updatedPhoto) {
        const photos = {...this.state.photos};
        photos[key] = updatedPhoto;
        this.setState({ photos });
    }

    removePhoto(key) {
        const photos = {...this.state.photos};
        photos[key] = null;
        this.setState({ photos });
    }

    render() {
        const photos = this.state.photos;
        const photo = Object.keys(photos).filter((key) => photos[key].name === this.props.params.photoId);

        return (
            <div>
                <InnerHeader tagline={this.props.params.placeId} />
                <ul className="list-of-photos">
                    {
                        Object
                        .keys(this.state.photos)
                        .filter(key => this.state.photos[key].place === this.props.params.placeId)
                        .map(key =>
                        <MainPhoto
                            key={key}
                            index={key}
                            details={this.state.photos[key]}
                            addPhoto={this.addPhoto}
                            updatePhoto={this.updatePhoto}
                            removePhoto={this.removePhoto}
                            toggleEditPhoto={this.toggleEditPhoto}
                            uid={this.state.uid}
                            owner={this.state.owner}
                        />)
                    }
                </ul>
                <AddPhotoForm
                    addPhoto={this.addPhoto}
                    placeName={this.props.params.placeId}
                    authenticate={this.authenticate}
                    authHandler={this.authHandler}
                    uid={this.state.uid}
                    logout={this.logout}
                    owner={this.state.owner}
                />

                { 
                    this.state.showEditPhotoForm
                    &&
                    <EditPhotoForm
                        photos={this.state.photos}
                        editPhoto={this.state.editPhoto}
                        addhotoe={this.addPhoto}
                        updatePhoto={this.updatePhoto}
                        toggleEditPhoto={this.toggleEditPhoto}
                    />
                }
            </div>
        )
    }
}


InnerPlace.propTypes = {
    params: React.PropTypes.object.isRequired
}

export default InnerPlace;