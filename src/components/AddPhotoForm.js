import React from 'react';
import firebase from '../base';

class AddPhotoForm extends React.Component {
    constructor() {
        super();
        this.toggleShowAddPhoto = this.toggleShowAddPhoto.bind(this);
        
        this.state = {
            showAddPhoto: true
        }
    }

    createPhoto(e) {
        e.preventDefault();

        const photo = {
            name: this.name.value,
            credit: this.credit.value,
            image: this.image.value,
            sound: this.sound.value,
            place: this.place.value
        }

        let hasData = this.name.value && this.credit.value && this.image.value && this.place.value !== '';

        if (hasData) {
            this.props.addPhoto(photo);
            this.photoForm.reset();
        }
    }

    toggleShowAddPhoto() {
        const showAddPhoto = this.state.showAddPhoto;

        if (showAddPhoto)
        {
            this.setState({ showAddPhoto: false })
        } else {
            this.setState({ showAddPhoto: true })
        }
    }

    renderLogin() {
        return (
            <nav className="login">
                <button className="twitter" onClick={() => this.props.authenticate(new firebase.auth.TwitterAuthProvider())}>Log In</button>
            </nav>
        )
    }

    
    render() {
        const logout = <div className="logout"><button onClick={this.props.logout}>Log Out!</button></div>;
        const showAddPhoto = <div className="show-add-photo"><button onClick={this.toggleShowAddPhoto}>Add photo</button></div>;

        if (!this.props.uid) {
            return <div>{this.renderLogin()}</div>
        }

        if (this.props.uid !== this.props.owner) {
            return (
                <div>
                    <p>Sorry, you aren't the owner of this store!</p>
                    {logout}
                </div>
            )
        }

        return (
            <div>
                {logout}
                {showAddPhoto}
                {
                    this.state.showAddPhoto
                    &&
                    <form ref={(input) => this.photoForm = input} className="photo-add add-edit-form" onSubmit={(e) => this.createPhoto(e)}>
                        <input ref={(input) => this.name = input} type="text" placeholder="Photo name" />
                        <input ref={(input) => this.credit = input} type="text" placeholder="Photo credit" />
                        <input ref={(input) => this.image = input} type="text" placeholder="Photo image" />
                        <input ref={(input) => this.sound = input} type="text" placeholder="Photo sound" />
                        <input ref={(input) => this.place = input} defaultValue={this.props.placeName} type="text" placeholder="Photo place" />
                        <button type="submit">Add Photo</button>
                    </form>
                }
            </div>
        )
    }
}

export default AddPhotoForm;