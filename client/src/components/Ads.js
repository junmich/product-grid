import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import '../style/main.css';

class Ads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...this.props};
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps
        });
    }
    render() {
        const { ad } = this.state;
        return (
            <div>
                <img className="rounded mx-auto" alt="" src={`/ads?r=${ad}}`} />
            </div>
        )
    };
}

Ads.propTypes = {
    ad: PropTypes.number.isRequired,
};

export default Ads;
