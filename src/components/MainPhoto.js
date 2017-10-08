import React from 'react';

class MainPhoto extends React.Component {
    
    render() {
        const {details, index} = this.props;

        return (
            <div>
                <img src={details.image} alt={details.name} className="main-photo"/>
                <audio controls>
                  <source src={details.sound} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <div className="tools">
                    <button onClick={() => this.props.toggleEditPhoto(index)}>Edit</button>
                    <button onClick={() => this.props.removePhoto(index)}>Delete</button>
                </div>
            </div>
        )
    }
}


export default MainPhoto;