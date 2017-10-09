import React from 'react';
import firebase from '../base';

class AddPlaceForm extends React.Component {

    createPlace(e) {
        e.preventDefault();

        const place = {
            name: this.name.value,
            desc: this.desc.value,
            image: this.image.value
        }

        let hasData = this.name.value && this.image.value !== '';

        if (hasData) {
            this.props.addPlace(place);
            this.placeForm.reset();
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
                <form ref={(input) => this.placeForm = input} className="place-add add-edit-form" onSubmit={(e) => this.createPlace(e)}>
                    <input ref={(input) => this.name = input} type="text" placeholder="Place name" />
                    <input ref={(input) => this.desc = input} type="text" placeholder="Place desc" />
                    <input ref={(input) => this.image = input} type="text" placeholder="Place image" />
                    <button type="submit">Add Place</button>
                </form>
            </div>
        )
    }
}

export default AddPlaceForm;