import React from 'react';
import PropTypes from 'prop-types';
import '../style/main.css';

const Content = ({ children }) => {
    return (
        <div className="content">
            {children}
        </div>
    );
};

Content.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Content;