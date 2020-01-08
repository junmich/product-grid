import React from 'react';
import { Header, Description, Ads, Products } from './components'; // updated import - package components in on import


import { container } from './style/main'; // demonstrate react js style
import './style/main.css'; // demonstrate css loader

class App extends React.Component {
    componentDidMount()
    {
        // console.log('amount test');
        // fetch('/products')
        //     .then(response => response.json())
        //     .then(data => console.log(data));
    }
    render() {
        return (
            <div style={container}>
                <Header title="Products Grid" />
                <Description>
                    Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.
                </Description>
                <Description>
                    But first, a word from our sponsors:
                    <Ads />
                </Description>
                <Products />
            </div>
        );
    }
}

export default App;