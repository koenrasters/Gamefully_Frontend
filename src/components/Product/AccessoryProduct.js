import React, {Component} from 'react';
import Auth from "../Auth/Auth";
import API from "../API/API";

class AccessoryProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accessory: [],
            id : this.props.match.params.id,
            cart: [],
            stock: []
        }
    }

    async componentDidMount() {
        let id = Auth.getId()
        await API.get(`/accessories/${this.state.id}`)
            .then(res => {
                const accessory = res.data;
                this.setState({accessory: accessory});
                this.setState({stock: accessory.stock});
                console.log(res.data);
                console.log(res.status);
            })
        if(id > 0)
        {
            await API.get(`cart/${id}`)
                .then(res => {
                    const cart = res.data;
                    this.setState({cart: cart.cartItems})
                    console.log(res.data.cartItems);
                })
        }
    }

    checkIfInCart()
    {
        if(!Auth.getIsAuthenticated())
        {
            return <button className="button is-fullwidth" style={{fontWeight: "bold", color: "#0096e3"}}>Login to add to cart</button>
        }
        let same = false;
        for (let i = 0; i < this.state.cart.length; i++) {
            if(this.state.cart[i].product.id == this.state.id)
            {
                same = true;
                break;
            }
        }

        if(same)
        {
            return <button className="button is-fullwidth" style={{fontWeight: "bold", color: "#0096e3"}}><i className="fas fa-check"></i>Added to cart</button>
        }
        else{
            return <button onClick={this.putInCart} className="button is-fullwidth" style={{fontWeight: "bold", color: "#0096e3"}}><i className="fas fa-shopping-basket"></i>Add to cart</button>
        }
    }

    putInCart = async() =>
    {
        let userId = Auth.getId();
        let productId = this.state.id;
        let add = {
            userId: userId,
            productId: productId
        }

        await API.post("cart/add", add)
            .then(res =>{
                console.log(res.status)
            })
        await this.componentDidMount();
        this.props.checkCart();
    }


    render() {
        let accessory = this.state.accessory;
        let stock = this.state.stock;
        return (
            <div className="container">
                <nav className="breadcrumb pt-3" aria-label="breadcrumbs">
                    <ul>
                        <a onClick={this.props.history.goBack}>
                            <strong>
                                <p>
                                    <i className="fas fa-angle-left"></i> Go back
                                </p>
                            </strong>
                        </a>
                        |
                        <li><a href="/">Home</a></li>
                        <li><a href="/accessories">{accessory.category}</a></li>
                        <li className="is-active"><a href="#" aria-current="page">{accessory.title}</a></li>
                    </ul>
                </nav>
                <h1 className="title">{accessory.title}</h1>
                <div className="columns">
                    <div className="column is-8">
                        <figure className="image is-16by9">
                            <img src="https://bulma.io/images/placeholders/640x360.png"/>
                        </figure>
                        <div className="columns">
                            <div className="column is-half">
                                <p className="is-size-5"><strong>EAN</strong></p>
                                <p>{accessory.ean}</p>
                                <p className="is-size-5"><strong>Platform</strong></p>
                                <p>{accessory.platform}</p>
                                <p className="is-size-5"><strong>Category</strong></p>
                                <p>{accessory.category}</p>
                            </div>
                            <div className="column is-half">
                                <p className="is-size-5"><strong>Brand</strong></p>
                                <p>{accessory.brand}</p>
                                <p className="is-size-5"><strong>Color</strong></p>
                                <p>{accessory.color}</p>
                            </div>
                        </div>
                        <p className="is-size-4"><strong>Description</strong></p>
                        <p>{accessory.description}</p>
                    </div>
                    <div className="column is-4">
                        <p>Available items: {stock.quantity}</p>
                        <p className="is-size-2"><strong>€{accessory.sellingPrice}</strong></p>
                        {this.checkIfInCart()}
                    </div>
                </div>

            </div>
        );
    }
}

export default AccessoryProduct;