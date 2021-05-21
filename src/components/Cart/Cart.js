import React, {Component} from 'react';
import API from "../API/API";
import "./Cart.css"
import Auth from "../Auth/Auth";
import {NavLink, Redirect} from "react-router-dom";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            cartItems: [],
            stock: [],
            quantity: []
        }
    }

    async getCart()
    {
        let id = Auth.getId()
        console.log(id)
        if(id > 0)
        {
            await API.get(`cart/${id}`)
                .then(res => {
                    const cart = res.data;
                    this.setState({cart: cart});
                    this.setState({cartItems: cart.cartItems})
                    console.log(res.status);
                })
        }
        this.props.checkCart()
    }

    async componentDidMount()
    {
        await this.getCart();
        console.log(this.state.stock)
    }

    changeCart = async (id, quantity) =>
    {
        console.log(quantity)
        await API.put(`cart/item/${id}`, quantity)
            .then(res => {
                console.log(res.status);
            })
        await this.getCart()
    }

    deleteCart = async (id) =>
    {
        await API.delete(`cart/item/${id}`)
            .then(res => {
                console.log(res.status)
            })
        await this.getCart()
    }

    getComponent = (category, id) =>
    {
        let link;
        if(category == "Games")
        {
            link = "games";
        }
        else if(category == "Consoles")
        {
            link = "consoles"
        }
        else
        {
            link = "accessories"
        }
        return "/product/" + link + "/" + id;
    }

    render() {
        return (
            <div className="container container-padding">
                <h1 className="title">Cart</h1>
                <table className="table is-fullwidth is-hoverable">
                    <tbody>
                    {this.state.cartItems.map(cartItem =>
                    <tr key={cartItem.id}>
                        <th>
                            <figure className="image is-128x128">
                                <a href={this.getComponent(cartItem.product.category, cartItem.product.id)}>
                                    <img src="https://bulma.io/images/placeholders/128x128.png"/>
                                </a>
                            </figure>
                        </th>
                        <th>
                            <a href={this.getComponent(cartItem.product.category, cartItem.product.id)}>{cartItem.product.title}</a>
                        </th>
                        <td>{cartItem.product.description}</td>
                        <td><p>Quantity <select value={cartItem.quantity} onChange={(e) => this.changeCart(cartItem.id, e.target.value)}>
                            {
                                Array.from(Array(cartItem.product.stock.quantity)).map((e,i) =>
                                <option key={i} value={i+1}>{i+1}</option>
                            )}

                            </select></p>
                            <a onClick={() => this.deleteCart(cartItem.id)}>Delete <i className="far fa-trash-alt"></i></a>
                        </td>

                        <td>
                            €{cartItem.total}
                        </td>
                    </tr>
                   )}

                    </tbody>
                </table>
                {this.state.cartItems.length > 0 &&
                    <p style={{"textAlign": "right"}}>Total price: €{this.state.cart.total}</p>
                }
                {
                    this.state.cartItems.length == 0 &&
                    <p>Cannot find any items because you did not put anything in your cart</p>
                }

            </div>
        );
    }
}

export default Cart;