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
        const {loading, products, hasMore, sortBy, sortSelection } = this.state;
        const loadingElement = loading ? <Loading /> : null;
        const endOfCatalog = hasMore ? null : <div className="endNote">~ End Of Catalog ~</div>;
        return (
            <section className="products">
                <div className="container">
                    {/*<div className="row sticky-grid-header">*/}
                    {/*    <div className="col-md-3">*/}
                    {/*        Id*/}
                    {/*    </div>*/}
                    {/*    <div className="col-md-3">*/}
                    {/*       Face / Size*/}
                    {/*    </div>*/}
                    {/*    <div className="col-md-3">*/}
                    {/*        Price*/}
                    {/*    </div>*/}
                    {/*    <div className="col-md-3">*/}
                    {/*        DateTime*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {this.getProducts()}
                </div>
                {loadingElement}
                {endOfCatalog}
            </section>
        )
    }
}

export default Products;
