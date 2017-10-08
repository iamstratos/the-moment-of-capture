import React from 'react';

class MainPhoto extends React.Component {
    constructor() {
        super();
        this.renderTools = this.renderTools.bind(this);
    }

    renderTools() {
        const {index} = this.props;

        return (
            <div className="tools">
                <button onClick={() => this.props.toggleEditPhoto(index)}>Edit</button>
                <button onClick={() => this.props.removePhoto(index)}>Delete</button>
            </div>
        )
    }

    render() {
        const {details} = this.props;

        return (
            <div>
                <img src={details.image} alt={details.name} className="main-photo"/>
                <audio controls>
                  <source src={details.sound} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                
                { 
                    this.props.uid !== this.props.owner
                    &&
                    this.renderTools()
                }
            </div>
        )
    }
}


export default MainPhoto;