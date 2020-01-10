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
    componentWillMount() {
        this.loadProductsFromServer();
    }
    componentDidMount() {
        this.initialLoad();
    }
    // use arrow function - because using arrow function, I don't need to bind each method
    initialLoad = () => {
        this.setRequestingProductOnBackground();
        this.setInitialProductLoading();
        // set on scroll handle
        window.addEventListener('scroll', this.handleScroll);
    };
    setRequestingProductOnBackground = () => {
        // set products loading on background
        const productsInterval = setInterval(this.loadProductsFromServer, 5000);
        this.setState({ productsInterval });
    };
    setInitialProductLoading = () => {
        // load initial product on queue
        const initialLoadInterval = setInterval(this.loadInitialProduct, 1000);
        this.setState({ initialLoadInterval });
    };
    loadInitialProduct = () => {
        const { initialLoadInterval, productsQueue } = this.state;
        // load only product if product queue is not empty
        if (productsQueue.length > 0) {
            this.loadProductsFromQueue();
            this.loadProductsFromServer();
            clearInterval(initialLoadInterval);
        }
    };
    loadProductsFromQueue = () => {
        const { productsQueue } = this.state;
        if (productsQueue.length === 0) {
            this.setState({hasMore: false});
            return null;
        }
        // use existing javascript queue feature to manage the display of data
        const data = productsQueue.shift();
        this.setState({
            products: [...this.state.products, ...data],
            loading: false,
        });
    };
    sortProduct = () => {
        let { productsInterval } = this.state;
        clearInterval(productsInterval);
        productsInterval = setInterval(this.loadProductsFromServer, 5000);
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
    loadProductsFromServer = () => {
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
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };
    handleScroll = (event) => {
        const {loading, hasMore} = this.state;
        if (loading || !hasMore) return;
        // Checks that the page has scrolled to the bottom - make sure that it will work on safari
        const innerHeight = window.innerHeight;
        const offSet = document.documentElement.offsetHeight;
        let scrollTop = event.srcElement.documentElement.scrollTop;
        if (scrollTop === 0) {
            scrollTop = event.srcElement.body.scrollTop;
        }
        if (innerHeight + scrollTop === offSet) {
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
    };
    getRandomAd = () => {
        const { previousAd } = this.state;
        // make sure that ad will show twice in a row
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
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <Description>
                                    Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.
                                </Description>
                            </div>
                            <div className="col-md-6">
                                <Description>
                                    But first, a word from our sponsors:
                                    <Ads ad={this.state.ad} />
                                </Description>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2 sort-by">
                                Sort By:
                            </div>
                            <div className="col-md-4 sort-by">
                                <select className="form-control" name="sortBy" value={sortBy} onChange={this.handleChange}>
                                    {sortSelection.map(selection => <option key={selection} value={selection}>{selection.toUpperCase()}</option>)}
                                </select>
                            </div>
                            <div className="col-md-6 sort-by">
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