import React from 'react';
import { header } from '../style/main';

const Header = ({title}) => {
    return (
        <div style={header}>
            {title}
        </div>
    );
};

export default Header;