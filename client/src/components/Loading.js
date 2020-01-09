import React from 'react';
import '../style/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Loading = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <div className="lds-spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <br />
                    LOADING ...
                </div>
            </div>
        </div>
    );
};

export default Loading;