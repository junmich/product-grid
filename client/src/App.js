import React, {Fragment} from 'react';
import { Header, Description, Ads, Products } from './components'; // updated import - package components in on import


import { container } from './style/main'; // demonstrate react js style
import './style/main.css'; // demonstrate css loader
import 'bootstrap/dist/css/bootstrap.min.css';
import { chunkArray } from './utills/helper';

class App extends React.Component {
    state = {
        products: [],
        productsQueue: [],
        hasMoreProduct: true,
        hasMore: true,
        loading: false,
        pageNumber: 1,
        sortBy: 'id',
        sortSelection: ['id', 'size', 'price'],
        initialLoadInterval: null,
        productsInterval: null,
        ad: 1,
        previousAd: 0,
    };
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };
    componentWillMount() {
        const productsInterval = setInterval(this.loadProducts, 5000);
        this.setState({ productsInterval });
    }
    componentWillReceiveProps(nextProps) {
        const { sortBy, productsInterval } = this.state;
        const nextSortBy = nextProps.sortBy;
        if (sortBy !== nextSortBy) {
            clearInterval(productsInterval);
            const productsInterval = setInterval(this.loadProducts, 5000);
            this.setState({
                sortBy: nextSortBy,
                products: [],
                productsQueue: [],
                pageNumber: 1,
                loading: true,
                hasMoreProduct: true,
                productsInterval
            });
            this.initialLoad();
        }
    }
    componentDidMount() {
        this.initialLoad();
        window.addEventListener('scroll', this.handleScroll);
    }
    initialLoad = () => {
        const initialLoadInterval = setInterval(this.loadInitialProduct, 1000);
        this.setState({ initialLoadInterval });
    };
    loadInitialProduct = () => {
        const { initialLoadInterval, productsQueue } = this.state;
        if (productsQueue.length > 0) {
            this.loadProductsFromQueue();
            this.loadProducts();
            clearInterval(initialLoadInterval);
        }
    };
    loadProductsFromQueue = () => {
        const { productsQueue } = this.state;
        console.log(productsQueue, 'queue data');
        if (productsQueue.length === 0) {
            this.setState({hasMore: false});
            return null;
        }
        const data = productsQueue.shift();
        console.log('queue data', data);
        this.setState({
            products: [...this.state.products, ...data],
            loading: false,
        });
    };
    sortProduct = () => {
        let { productsInterval } = this.state;
        clearInterval(productsInterval);
        productsInterval = setInterval(this.loadProducts, 5000);
        this.setState({
            products: [],
            productsQueue: [],
            pageNumber: 1,
            loading: true,
            hasMoreProduct: true,
            hasMore: true,
            productsInterval
        });
        this.initialLoad();
    };
    loadProducts = () => {
        const { pageNumber, sortBy, productsQueue, products, hasMoreProduct } = this.state;
        this.setState({ loading: productsQueue.length === 0 && products.length === 0});
        if (!hasMoreProduct) return null;
        fetch(`/products?_page=${pageNumber}&_limit=100&_sort=${sortBy}`)
            .then(response => response.json())
            .then(data => {
                console.log('hasmore queue data', data.length);
                const hasMoreProduct =data.length === 100;
                // productsQueue.push(data);
                const newdata = chunkArray(data, 20);
                console.log('hasmore queue data', data.length);
                this.setState({
                    productsQueue: [...productsQueue, ...newdata],
                    hasMoreProduct,
                    pageNumber: pageNumber+1,
                    loading: false,
                })
            });
    };
    handleScroll = (event) => {
        const {loading, hasMore} = this.state;
        if (loading || !hasMore) return;

        // Checks that the page has scrolled to the bottom
        if (
            window.innerHeight + event.srcElement.documentElement.scrollTop
            === document.documentElement.offsetHeight
        ) {
            this.loadProductsFromQueue();
            // end scroll at every  20 items
            this.retrieveAd();
        }
    };
    retrieveAd = () => {
        const ad = this.getRandomAd();
        this.setState({
            ad,
            previousAd: ad,
        });
    }
    getRandomAd = () => {
        const { previousAd } = this.state;
        let randomAd = previousAd;
        while (previousAd === randomAd) {
            randomAd = Math.floor(Math.random()*1000);
            if (randomAd !== previousAd) {
                break;
            }
        }
        return randomAd;
    };
    render() {
        const { sortSelection, sortBy } = this.state;
        return (
            <div style={container}>
                <header className="sticky">
                    <Header title="Products Grid" />
                    <Description>
                        Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.
                    </Description>
                    <Description>
                        But first, a word from our sponsors:
                        <Ads ad={this.state.ad} />
                    </Description>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <select className="form-control" name="sortBy" value={sortBy} onChange={this.handleChange}>
                                    {sortSelection.map(selection => <option key={selection} value={selection}>{selection.toUpperCase()}</option>)}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <button type="button" className="btn btn-primary" onClick={this.sortProduct}>Sort Product</button>
                            </div>
                        </div>
                    </div>
                    <hr />
                </header>
                <div className="content">
                    <Products {...this.state} />
                </div>
            </div>
        );
    }
}

export default App;