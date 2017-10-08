import React from 'react';

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

    render() {
        return (
            <div>
                <form ref={(input) => this.placeForm = input} className="place-add" onSubmit={(e) => this.createPlace(e)}>
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