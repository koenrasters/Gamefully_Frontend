import React, {Component} from 'react';
import './Header.css';
import {NavLink} from 'react-router-dom';
import Logo from '../../Media/logo.png'
import Auth from "../Auth/Auth";

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false,
            isLoggedIn: false,
            cartItems: 0,
        }
    }

    handleClick = () => {
        const bool = this.state.isToggleOn;
        this.setState({
            isToggleOn: !bool
        });
        this.props.checkCart()
    }

    logoutClick = () => {
        Auth.deleteCookie();
        this.props.checkLogin()
        this.setState({cartItems: 0})
        this.handleClick();
    }

    componentDidMount() {
        this.setState({
            isLoggedIn: this.props.isLoggedIn,
            cartItems: this.props.cartItems
        })
    }

    render() {
        let menuActive = this.state.isToggleOn ? 'is-active' : ''

        return (
            <div>
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="container">
                        <div className="navbar-brand">
                            <a className="navbar-item" href="/">
                                <img alt="logo" src={Logo}/>
                            </a>

                            <a role="button" onClick={this.handleClick} className={"navbar-burger burger "+ menuActive} aria-label="menu" aria-expanded="false"
                               data-target="navbarBasicExample">
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                            </a>
                        </div>

                        <div id="navbarBasicExample" className={'navbar-menu '+ menuActive}>
                            <div className="navbar-start">
                                <NavLink exact to="/" activeClassName="active" className="navbar-item r-item" onClick={this.handleClick}>Home</NavLink>
                                <NavLink to="/products" activeClassName="active" className="navbar-item r-item" onClick={this.handleClick}>All Products</NavLink>
                                <NavLink to="/games" activeClassName="active" className="navbar-item r-item" onClick={this.handleClick}>Games</NavLink>
                                <NavLink to="/consoles" activeClassName="active" className="navbar-item r-item" onClick={this.handleClick}>Consoles</NavLink>
                                <NavLink to="/accessories" activeClassName="active" className="navbar-item r-item" onClick={this.handleClick}>Accessories</NavLink>
                            </div>
                            {this.props.isLoggedIn ?
                                <div className="navbar-end">
                                    <div className="navbar-item">
                                        <div className="buttons">
                                            <div className="welcometxt">
                                                <p className="is-inline welcome">Welcome, <strong className="text">{Auth.getData().firstName}</strong>!</p>
                                            </div>

                                            <NavLink to="/cart" className="button is-light" onClick={this.handleClick}>
                                                <i className="fas fa-shopping-cart fa-2x"></i>
                                                <p className="shoppingCount">{this.props.cartItems}</p>
                                            </NavLink>




                                            {Auth.getRole() == 1 &&
                                            <NavLink to="/admin" className="button is-light" activeClassName="active" onClick={this.handleClick}><strong>Admin</strong></NavLink>
                                            }
                                            <strong>
                                                <NavLink to="/" activeClassName="" className="button is-primary" onClick={this.logoutClick}>Logout</NavLink>
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="navbar-end">
                                    <div className="navbar-item">
                                        <div className="buttons">
                                            <NavLink to="/register" className="button is-primary" activeClassName="" onClick={this.handleClick}>
                                                <strong>Sign up</strong>
                                            </NavLink>
                                            <NavLink to="/login" className="button is-light" activeClassName="active" onClick={this.handleClick}>
                                                <strong>Login</strong>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;