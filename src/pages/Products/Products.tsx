import React from 'react';
import styles from './Products.module.css';
import brand from '../../resources/brand.svg'
import Detail from '../../components/Detail/Detail';
import logout from '../../resources/log-out-icon.svg'
import SearchInput from '../../components/Search/Search';
import ListItems from '../../components/ListItems/ListItems';
import ProductService from '../../services/Products/Products';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton } from '@ionic/react';


interface IProps {
    history: any
};

interface IState { 
    products?: any,
    copy?: any,
    page?: any,
    pages?: any,
    actualview?: any,
    exchange?: any,
    filters?: any,
    loading: boolean,
    selected: any,
    notfound: boolean,
    text: string,
};

class Products extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    
        this.state = {
            products: [],
            copy: [],
            actualview: [],
            page: 0,
            pages: 0,
            filters: [],
            exchange: '',
            loading: false,
            notfound: false,
            selected: null,
            text: ''
        };
    }

    componentDidMount = ()  => { this.fetchProducts(); this.lastExchange(); }

    logOut = () => { this.props.history.push('/') }

    lastExchange = async () => {
        const exchange = await ProductService.lastExchange()
        await this.setState({ exchange: exchange })
    }
        
    fetchProducts = async () => {
        const products = await ProductService.fetchProduct()
        console.log(products);
        await this.setState({ 
            products: products, 
            filters: products, 
            loading: true 
        })
        await this.initialConfig();
    }

    initialConfig = async () => {
        let copy = await this.state.products;
        let actualview = await (this.state.products !== undefined) ? this.state.products.slice(this.state.page * 5, (this.state.page * 5) + 5) : null;
        await console.log(actualview);
        
        let pages = await (this.state.products !== undefined) ?  this.state.products.length : null;
        await this.setState({copy, actualview, pages, text: ''})
        console.log(this.state.actualview);
        
    }
    
    handleTextChange = (text: any) => {
        let products = this.state.products.filter((product: any)=> (product.name.toLowerCase()).includes(text.target.value.toLowerCase()))
        let actualview = products.slice(this.state.page * 5, (this.state.page * 5) + 5); 
        let notfound = (products.length > 0) ? false : true;
        let pages = (text) ? products.length : this.state.copy.length;

        this.setState({ 
            actualview,
            text: text.target.value, 
            filters: products,
            copy: products,
            pages,
            page: 0,
            notfound: notfound
        })
    }

    handleClearText = async () => {
        let copy = await this.state.products;
        let pages = await copy.length;
        let actualview = await copy.slice(0 * 5, (0 * 5) + 5)
        await this.setState({ text: '',  filters: this.state.products, copy, pages, page: 0, actualview, notfound: false })
    }

    handleProduct = (product: any) => this.setState({ selected: product })

    openScanner = async () => {
        const info = await BarcodeScanner.scan();
        let product = this.state.products.filter((item: any)=> item.codebar == info.text);
        (product.length > 0) ? this.setState({selected: product[0], notfound: false }) : this.setState({notfound: true, text: info.text, actualview: []});
        console.log(`Barcode data: ${info.text}`);
    };

    handleChangePage = (event: any, page: any) => {
        let actualview = this.state.copy.slice(page * 5, (page * 5) + 5)
        this.setState({page, actualview});
        this.scrollToTop();
    };

    getContent = () => { return document.querySelector('ion-content'); }

    scrollToTop = () => this.getContent()?.scrollToTop(500);

    roundToTwo = (num: any) => {  
        //@ts-ignore
        var amount = +(Math.round(num + 'e+2') + "e-2");
        var amountString = String(amount);
        var amountStringFinal = (amountString.includes('.')) ? amountString : amountString + '.00' 
        var amountStringFinal = amountStringFinal.replace(/\d(?=(\d{3})+\.)/g, '$&,')
        return amountStringFinal;
    }

    render = () => {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>
                            <img alt='' src={brand} width="30" />
                        </IonTitle>
                        <IonButtons slot="primary">
                            <IonButton>
                                <img alt='' src={logout} width="20" onClick={this.logOut}/>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen className={styles.page}>
                    <div className={styles.form}>
                        {(this.state.selected) ? null : 
                            <SearchInput text={this.state.text} 
                                handleTextChange={this.handleTextChange} 
                                handleClearText={this.handleClearText} 
                                openScanner={this.openScanner}
                            />
                        }
                        {(this.state.selected) ?
                            <Detail product={this.state.selected} exchange={this.state.exchange} handleProduct={this.handleProduct} fix={this.roundToTwo} /> :
                            <ListItems products={this.state.actualview} page={this.state.page} pages={this.state.pages} loading={this.state.loading} notfound={this.state.notfound} handleProduct={this.handleProduct} handleChangePage={this.handleChangePage} fix={this.roundToTwo} />
                        }
                    </div>
                </IonContent>
            </IonPage>
        )
    };
};

export default Products;
