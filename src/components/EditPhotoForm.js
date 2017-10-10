import React from 'react';

class EditPhotoForm extends React.Component {

    handleChange(e) {
        e.preventDefault()
        const photo = this.props.editPhoto;

        const updatedPhoto = {
            [e.target.name]: e.target.value
        }
        this.props.updatePhoto(photo, updatedPhoto);
    }


    render() {
        const photo = this.props.editPhoto;

        return (
            <div>
                <form className="photo-edit add-edit-form">
                    <input name="name" ref={(input) => this.name = input} defaultValue={this.props.photos[photo].name} type="text" placeholder="Photo name" onChange={(e) => this.handleChange(e)} />
                    <input name="credit" ref={(input) => this.credit = input} defaultValue={this.props.photos[photo].credit} type="text" placeholder="Photo credit" onChange={(e) => this.handleChange(e)} />
                    <input name="image" ref={(input) => this.image = input} defaultValue={this.props.photos[photo].image} type="text" placeholder="Photo image" onChange={(e) => this.handleChange(e)} />
                    <input name="sound" ref={(input) => this.sound = input} defaultValue={this.props.photos[photo].sound} type="text" placeholder="Photo sound" onChange={(e) => this.handleChange(e)} />
                    <button onClick={this.props.toggleEditPhoto}>Close</button>
                </form>
            </div>
        )
    }
}

export default EditPhotoForm;