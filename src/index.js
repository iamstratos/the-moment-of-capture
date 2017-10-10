import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import device from './device.min';

import './css/style.css';
import App from './components/App';
import InnerPlace from './components/InnerPlace';
import NotFound from './components/NotFound';

// const Root = () => {
class Root extends React.Component {
    constructor() {
        super()
        
        this.state = {
            places: {},
            showEditPlaceForm: false,
            editPlace: null
        };
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Match exactly pattern="/" component={App} />
                    <Match pattern="/place/:placeId" component={InnerPlace} />
                    <Miss component={NotFound} />
                    { device() }
                </div>
            </BrowserRouter>
        )
    }
}



render(<Root/>, document.querySelector('#main'));