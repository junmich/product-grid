import React from 'react';
import { content } from '../style/main';

const Description = ({ children }) => {
    return (
        <div style={content}>
            {children}
        </div>
    );
};

export default Description;