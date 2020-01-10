import React from 'react';
import '../style/main.css';

const EndOfCatalog = ({ hasMore }) => {
    return hasMore ? null : (
        <div className="endNote">~ End of Catalog ~</div>
    );
};

export default EndOfCatalog;