import React, { Fragment } from 'react';
import Loading from './Loading';
import { getRelativeTime } from '../utills/helper';
import '../style/main.css';

class Products extends React.Component {
    state = {
        products: [],
        hasMore: true,
        loading: false,
        pageNumber: 1,
    };
    componentWillMount() {
        this.loadProducts();
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    loadProducts = () => {
        const { pageNumber } = this.state;
        this.setState({loading: true});
        fetch(`/products?_page=${pageNumber}&_limit=15`)
            .then(response => response.json())
            .then(data => {
                console.log('hasmore', data.length);
                this.setState({
                    products: [...this.state.products, ...data],
                    hasMore: data.length === 15,
                    loading: false,
                    pageNumber: pageNumber+1,
                })
            });
    }
    handleScroll = (event) => {
        const {loading, hasMore} = this.state;
        if (loading || !hasMore) return;
        // console.log(window.innerHeight, event.srcElement.documentElement.scrollTop, document.documentElement.offsetHeight)

        // Checks that the page has scrolled to the bottom
        if (
            window.innerHeight + event.srcElement.documentElement.scrollTop
            === document.documentElement.offsetHeight
        ) {
            this.loadProducts();
        }
    }
    render() {
        const {loading, products, hasMore} = this.state;
        const loadingElement = loading ? <Loading /> : null;
        const endOfCatalog = hasMore ? null : <div>End Of Catalog</div>;
        return (
            <section className="products">
                {products.map(product  => (
                    <Fragment key={product.id}>
                        <hr />
                        <div style={{ display: 'flex' }}>
                            <div>
                                <p style={{ size: product.size }}>{product.face}</p>
                                <p>{product.price}</p>
                                <p>{getRelativeTime(new Date(), new Date(product.date))}</p>
                            </div>
                        </div>
                    </Fragment>
                ))}
                {loadingElement}
                {endOfCatalog}
            </section>
        )
    }
}

export default Products;
