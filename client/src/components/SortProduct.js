import React from 'react';
import PropTypes from 'prop-types';
import '../style/main.css';

const SortProduct = ({ onChange, sortSelection, sortBy, sortProduct }) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-2 sort-by">
                    Sort By:
                </div>
                <div className="col-md-4 sort-by">
                    <select
                        className="form-control"
                        name="sortBy" value={sortBy}
                        onChange={onChange}
                    >
                        {sortSelection.map(selection => (
                            <option key={selection} value={selection}>
                                {selection.toUpperCase()}
                            </option>)
                        )}
                    </select>
                </div>
                <div className="col-md-6 sort-by">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={sortProduct}>
                        Sort Product
                    </button>
                </div>
            </div>
        </div>
    );
};

SortProduct.propTypes = {
    onChange: PropTypes.func.isRequired,
    sortSelection: PropTypes.array.isRequired,
    sortBy: PropTypes.string.isRequired,
    sortProduct: PropTypes.func.isRequired,
};

export default SortProduct;