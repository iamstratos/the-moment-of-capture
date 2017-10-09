import React from 'react';

class EditPlaceForm extends React.Component {

    handleChange(e) {
        e.preventDefault()
        const place = this.props.editPlace;

        const updatedPlace = {
            
            [e.target.name]: e.target.value
        }
        this.props.updatePlace(place, updatedPlace);
    }


    render() {
        const place = this.props.editPlace;

        return (
            <div>
                <form className="place-edit">
                    <input name="name" ref={(input) => this.name = input} defaultValue={this.props.places[place].name} type="text" placeholder="Place name" onChange={(e) => this.handleChange(e)} />
                    <input name="desc" ref={(input) => this.desc = input} defaultValue={this.props.places[place].desc} type="text" placeholder="Place desc" onChange={(e) => this.handleChange(e)} />
                    <input name="image" ref={(input) => this.image = input} defaultValue={this.props.places[place].image} type="text" placeholder="Place image" onChange={(e) => this.handleChange(e)} />
                    <button onClick={this.props.toggleEditPlace}>Close</button>
                </form>
            </div>
        )
    }
}

export default EditPlaceForm;