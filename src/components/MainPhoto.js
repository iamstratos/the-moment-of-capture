import React from 'react';

class MainPhoto extends React.Component {
    constructor() {
        super();
        this.renderTools = this.renderTools.bind(this);
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseExit = this.mouseExit.bind(this);
        this.getCreditName = this.getCreditName.bind(this);

        this.state = {
            mouseOver: 0 // 0 for mouseExit, 1 for mouseEnter
        }
    }

    mouseEnter() {

        document.querySelector(`body`).classList.add('white');

        let playPromise = this.audio.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
            })
            .catch(error => {
                return;
            });
        }

        this.setState({ mouseOver: 1 });

        let i = 0;

        if (this.audio.volume < 1 && this.audio.volume > 0)
        {
            i = JSON.stringify(this.audio.volume).slice(2);

        } else if (this.audio.volume === 0) {
            i = 1;
        }


        let fadeTimer = setInterval(() => {

            if (this.state.mouseOver === 0)
            {
                clearInterval(fadeTimer);
                return;
            }
            this.audio.volume = `0.${i++}`;

            if (this.audio.paused)
            {
                this.audio.play()
            }
            
            if (i === 10)
            {
                this.audio.volume = 1;
                clearInterval(fadeTimer);
                return;
            }
        }, 70);

       
    }

    mouseExit() {

        document.querySelector(`body`).classList.remove('white');

        let playPromise = this.audio.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                console.log('ok')
            })
            .catch(error => {
                console.log('error')
                return;
            });
        }

        this.setState({ mouseOver: 0 });

        let i = 9;

        if (this.audio.volume < 1 && this.audio.volume > 0)
        {
            i = JSON.stringify(this.audio.volume).slice(2);
            
        } else if (this.audio.volume === 1) {
            i = 9;
        }

        let fadeTimer = setInterval(() => {
            
            if (this.state.mouseOver === 1)
            {
                clearInterval(fadeTimer);
                return;
            }

            this.audio.volume = `0.${i--}`;

            if (this.audio.volume < 0.05)
            {
                clearInterval(fadeTimer);
                this.audio.pause();
                return;
            }
        }, 70);
    }

    getCreditName(url) {
        const urlArr = url.split('/');

        return urlArr[(urlArr.length - 2)];
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
            <div className="main-photo-wrapper">
                <div className="main-photo">
                    
                    <img
                        onMouseEnter={this.mouseEnter}
                        onMouseLeave={this.mouseExit}
                        src={details.image}
                        alt={details.name}
                        className="main-photo"
                    />
                    
                    <a href={details.credit} title="Photo by" target="_blank" className="photo-credit">{ this.getCreditName(details.credit) }</a>

                    <audio preload ref={(audio) => this.audio = audio}>
                    <source src={details.sound} type="audio/mpeg" />
                    Your browser does not support the audio element.
                    </audio>
                    
                    {
                        (this.props.uid === this.props.owner && this.props.uid)
                        &&
                        this.renderTools()
                    }
                    
                </div>
            </div>
        )
    }
}


export default MainPhoto;