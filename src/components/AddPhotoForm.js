import React from 'react';

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

    render() {
        return (
            <div>
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