import React from 'react';
import PropTypes from 'prop-types';
import { header } from '../style/main';

const Header = ({title}) => {
    return (
        <div style={header}>
            {title}
        </div>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;