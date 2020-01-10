import React, { Fragment } from 'react';
import Loading from './Loading';
import EndOfCatalog from './EndOfCatalog';
import { getRelativeTime, formatPrice } from '../utills/helper';
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
                <hr />
                <div className="row">
                    <div className="col-md-2">
                        {product.id}
                    </div>
                    <div className="col-md-4">
                        <span style={{ fontSize: product.size }}>{product.face}</span>
                    </div>
                    <div className="col-md-2">
                        {formatPrice(product.price)}
                    </div>
                    <div className="col-md-4">
                        {getRelativeTime(new Date(), new Date(product.date))}
                    </div>
                </div>
            </Fragment>
        ))
    };
    render() {
        console.log(this.state);
        const {loading, hasMore } = this.state;
        const loadingElement = loading ? <Loading loading={loading} /> : null;
        return (
            <section className="products">
                <div className="container product-header-sticky">
                    <div className="row sticky-grid-header">
                        <div className="col-md-2">
                            Id
                        </div>
                        <div className="col-md-4">
                           Face / Size
                        </div>
                        <div className="col-md-2">
                            Price
                        </div>
                        <div className="col-md-4">
                            DateTime
                        </div>
                    </div>
                </div>
                <div className="products-container container">
                    {this.getProducts()}
                </div>
                {loadingElement}
                <EndOfCatalog hasMore={hasMore} />
            </section>
        )
    }
}

export default Products;
