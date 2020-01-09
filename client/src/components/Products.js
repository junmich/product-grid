import React, { Fragment } from 'react';
import Loading from './Loading';
import {getRelativeTime, formatPrice, chunkArray} from '../utills/helper';
import '../style/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps
        });
    }
    getProducts = () => {
        const { products } = this.state;
        return products.map(product  => (
            <Fragment key={product.id}>
                <div className="row">
                    <div className="col-md-3">
                        {product.id}
                    </div>
                    <div className="col-md-3">
                        <span style={{ fontSize: product.size }}>{product.face}</span>
                    </div>
                    <div className="col-md-3">
                        {formatPrice(product.price)}
                    </div>
                    <div className="col-md-3">
                        {getRelativeTime(new Date(), new Date(product.date))}
                    </div>
                </div>
            </Fragment>
        ))
    };
    render() {
        console.log(this.state);
        const {loading, products, hasMore, sortBy, sortSelection } = this.state;
        const loadingElement = loading ? <Loading /> : null;
        const endOfCatalog = hasMore ? null : <div>~ End Of Catalog ~</div>;
        return (
            <section className="products">
                <div className="container">
                    {this.getProducts()}
                </div>
                {loadingElement}
                {endOfCatalog}
            </section>
        )
    }
}

export default Products;
