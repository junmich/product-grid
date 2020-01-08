import React from 'react';
import Countdown from './Countdown';
import '../style/main.css';

class Ads extends React.Component {
    state = {
      ad: 0,
      previousAd: 0,
    };
    componentWillMount() {
        setInterval(this.retrieveAd, 20000);
    }
    retrieveAd = () => {
        const ad = this.getRandomAd();
        this.setState({
            ad,
            previousAd: ad,
        });
    }
    getRandomAd = () => {
        const { previousAd } = this.state;
        let randomAd = previousAd;
        while (previousAd === randomAd) {
            randomAd = Math.floor(Math.random()*1000);
            if (randomAd !== previousAd) {
                break;
            }
        }
        return randomAd;
    };
    render() {
        const { ad } = this.state;
        return (
            <div>
                <Countdown text={"Ad will change in "} />
                <img alt="" src={`/ads?r=${ad}}`} />
            </div>
        )
    };
}

export default Ads;
