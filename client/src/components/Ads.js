import React from 'react';
import Countdown from './Countdown';
import '../style/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Ads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...this.props};
    }
    componentWillReceiveProps(nextProps) {
        // setInterval(this.retrieveAd, 20000);
        this.setState({
            ...nextProps
        });
    }
    render() {
        const { ad } = this.state;
        return (
            <div>
                {/*<Countdown text={"Ad will change in "} />*/}
                <img className="rounded mx-auto" alt="" src={`/ads?r=${ad}}`} />
            </div>
        )
    };
}

export default Ads;
