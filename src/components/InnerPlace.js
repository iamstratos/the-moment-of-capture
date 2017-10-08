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

        this.state = {
            places: {},
            photos: {},
            showEditPhotoForm: false
        }
    }


    componentWillMount() {
        firebase.syncState(`places`
            , {
                context: this,
                state: 'places'
            }    
        );

        
        firebase.syncState(`photos`
            , {
                context: this,
                state: 'photos'
            }    
        );
    }

    componentWillUnmount() {
        firebase.removeBinding(this.ref);
    }
    
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

        console.log(photos[photo])

        return (
            <div>
                <InnerHeader tagline={this.props.params.placeId} />
                <ul className="list-of-photos">
                    {
                        Object
                        .keys(this.state.photos)
                        .map(key =>
                        <MainPhoto
                            key={key}
                            index={key}
                            details={this.state.photos[key]}
                            addPhoto={this.addPhoto}
                            updatePhoto={this.updatePhoto}
                            removePhoto={this.removePhoto}
                            toggleEditPhoto={this.toggleEditPhoto}
                        />)
                    }
                </ul>
                <AddPhotoForm addPhoto={this.addPhoto} placeName={this.props.params.placeId} />

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