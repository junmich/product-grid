import React from 'react';
import PropTypes from 'prop-types';
import '../style/main.css';

const EndOfCatalog = ({ hasMore }) => {
    return hasMore ? null : (
        <div className="endNote">~ End of Catalog ~</div>
    );
};

EndOfCatalog.propTypes = {
    hasMore: PropTypes.bool.isRequired,
};

export default EndOfCatalog;