import React from 'react';

class MainPhoto extends React.Component {
    constructor() {
        super();
        this.renderTools = this.renderTools.bind(this);
        this.mouseExit = this.mouseExit.bind(this);

        this.state = {
            audioPlaying: true,
            stopAudioQue: false
        }
    }

    mouseEnter = () => {
        if (!this.state.audioPlaying)
        {
            return;
        }

        this.setState({ audioPlaying: true})

        this.audio.play()
        this.audio.volume = 0

        let i = 0;

        let fadeTimer = setInterval(() => {

            this.audio.volume = `0.${i++}`;
            if (i === 10)
            {
                this.audio.volume = 1;
                clearInterval(fadeTimer);
                this.setState({ audioPlaying: false})
                return;
            }
            if (this.state.stopAudioQue) {
                this.mouseExit()
                this.setState({ stopAudioQue: false})
            }
        }, 50);

       
    }

    mouseExit = () => {
        if (this.state.audioPlaying)
        {
            this.setState({ stopAudioQue: true})
            return;
        }
        let i = 9;

        let fadeTimer = setInterval(() => {
            
            this.audio.volume = `0.${i--}`;

            if (this.audio.volume < 0.05)
            {
                clearInterval(fadeTimer);
                this.audio.pause();
                this.setState({ audioPlaying: true})
                return;
            }
        }, 50);
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
            <div className="main-photo">
                
                <img
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseExit}
                    src={details.image}
                    alt={details.name}
                    className="main-photo"
                />
                
                <audio ref={(audio) => this.audio = audio}>
                  <source src={details.sound} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                
                {
                    (this.props.uid === this.props.owner && this.props.uid)
                    &&
                    this.renderTools()
                }
                
            </div>
        )
    }
}


export default MainPhoto;