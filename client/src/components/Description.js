import React from 'react';
import PropTypes from 'prop-types';
import { content } from '../style/main';
import Content from "./Content";

const Description = ({ children }) => {
    return (
        <div style={content}>
            {children}
        </div>
    );
};

Description.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Description;