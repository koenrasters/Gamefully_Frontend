import React, {Component, useState, useEffect} from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import Header from './components/Header/Header';
import HeaderAdmin from "./components/Header/HeaderAdmin";
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Products from "./components/Products/Products";
import GameProduct from "./components/Product/GameProduct";
import ConsoleProduct from "./components/Product/ConsoleProduct";
import AccessoryProduct from "./components/Product/AccessoryProduct";
import Games from './components/Games/Games';
import Consoles from './components/Consoles/Consoles';
import Accessories from './components/Accessories/Accessories';
import Login from "./components/Login/Login";
import Auth from "./components/Auth/Auth";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart"
import Admin from "./components/Admin/Admin";
import AddProduct from "./components/Admin/AddProduct";
import EditProduct from "./components/Admin/EditProduct";
import Statistics from "./components/Admin/Statistics";
import API from "./components/API/API";


export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            cartItems: 0,
            adminBar: false
        }
    }

    async componentDidMount() {
        this.setState({
            isLoggedIn: await Auth.checkAuthentication()
        });
        await this.checkCart()
        console.log("state loggin " + this.state.isLoggedIn)
    }

    checkLoginState() {
        const bool = Auth.getIsAuthenticated()
        this.setState({
            isLoggedIn: bool
        })
    }

    setAdminBar(bool)
    {
        this.setState({adminBar: bool});
    }

    async checkCart()
    {
        let id = Auth.getId()
        if(id > 0)
        {
            await API.get(`cart/quantity/${id}`)
                .then(res => {
                    const items = res.data;
                    this.setState({cartItems: items});
                    console.log(res.data);
                    console.log(res.status);
                })
        }

    }


    render()
    {
        return (
            <div>
                {!this.state.adminBar ?
                    <Header isLoggedIn={this.state.isLoggedIn} cartItems={this.state.cartItems} checkCart={this.checkCart.bind(this)} checkLogin={this.checkLoginState.bind(this)}/>
                    :
                    <HeaderAdmin isLoggedIn={this.state.isLoggedIn} cartItems={this.state.cartItems} checkCart={this.checkCart.bind(this)} checkLogin={this.checkLoginState.bind(this)}/>
                }
                <div className="main-content">
                    <Switch>
                        <Route exact path="/" render={(props) => <Home {...props} checkLogin={this.checkLoginState.bind(this)} checkCart={this.checkCart.bind(this)} isLoggedIn={this.state.isLoggedIn} setAdminBar={this.setAdminBar.bind(this)}/>}/>
                        <Route path="/products" component={Products}/>
                        <Route path="/product/games/:id" render={(props) => <GameProduct {...props} checkCart={this.checkCart.bind(this)}/>}/>
                        <Route path="/product/consoles/:id" render={(props) => <ConsoleProduct {...props} checkCart={this.checkCart.bind(this)}/>}/>
                        <Route path="/product/accessories/:id" render={(props) => <AccessoryProduct {...props} checkCart={this.checkCart.bind(this)}/>}/>
                        <Route path="/games" component={Games}/>
                        <Route path="/consoles" component={Consoles}/>
                        <Route path="/accessories" component={Accessories}/>
                        <Route path="/login" render={(props) => <Login {...props} isLoggedIn={this.state.isLoggedIn}/>}/>
                        <Route path="/register" render={(props) => <Register {...props} isLoggedIn={this.state.isLoggedIn}/>}/>
                        <Route path="/cart" render={(props) => <Cart {...props} isLoggedIn={this.state.isLoggedIn} checkCart={this.checkCart.bind(this)}/>}/>
                        <Route exact path="/admin" render={(props) => <Admin {...props} isLoggedIn={this.state.isLoggedIn} setAdminBar={this.setAdminBar.bind(this)}/>}/>
                        <Route path="/admin/add" render={(props) => <AddProduct {...props} isLoggedIn={this.state.isLoggedIn} setAdminBar={this.setAdminBar.bind(this)}/>}/>
                        <Route path="/admin/edit/:category/:id" render={(props) => <EditProduct {...props} isLoggedIn={this.state.isLoggedIn} setAdminBar={this.setAdminBar.bind(this)}/>}/>
                        <Route path="/admin/stats" render={(props) => <Statistics {...props} isLoggedIn={this.state.isLoggedIn} setAdminBar={this.setAdminBar.bind(this)}/>}/>
                        <Route render={()=> (<Redirect to='/'/>)}/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        );
    }
}