import React from 'react';
import PropTypes from 'prop-types';
import '../style/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const AnimatedLoading = () => {
    const divs = [];
    for (let i = 0; i < 12; i++) {
        divs.push(<div key={i} />);
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <div className="lds-spinner">
                        {divs}
                    </div>
                    <br />
                    LOADING ...
                </div>
            </div>
        </div>
    );
};

const Loading = ({ loading }) => {
    return loading ? <AnimatedLoading /> : null;
};

Loading.propTypes = {
    loading: PropTypes.bool.isRequired,
};

export default Loading;