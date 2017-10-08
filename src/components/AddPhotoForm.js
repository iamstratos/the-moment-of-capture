import React from 'react';
import firebase from '../base';

class AddPhotoForm extends React.Component {
    createPhoto(e) {
        e.preventDefault();

        const photo = {
            name: this.name.value,
            desc: this.credit.value,
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

    renderLogin() {
        return (
            <nav className="login">
            <p>Sign in to add/edit</p>
                <button className="twitter" onClick={() => this.props.authenticate(new firebase.auth.TwitterAuthProvider())}>Log In with Twitter</button>
            </nav>
        )
    }

    render() {
        const logout = <button onClick={this.props.logout}>Log Out!</button>;

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
                <form ref={(input) => this.photoForm = input} className="photo-add" onSubmit={(e) => this.createPhoto(e)}>
                    <input ref={(input) => this.name = input} type="text" placeholder="Photo name" />
                    <input ref={(input) => this.credit = input} type="text" placeholder="Photo credit" />
                    <input ref={(input) => this.image = input} type="text" placeholder="Photo image" />
                    <input ref={(input) => this.sound = input} type="text" placeholder="Photo sound" />
                    <input ref={(input) => this.place = input} defaultValue={this.props.placeName} type="text" placeholder="Photo place" />
                    <button type="submit">Add Photo</button>
                </form>
            </div>
        )
    }
}

export default AddPhotoForm;