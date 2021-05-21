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
                                <NavLink exact to="/admin" activeClassName="active" className="navbar-item r-item" onClick={this.handleClick}>Admin Home</NavLink>
                                <NavLink to="/admin/add" activeClassName="active" className="navbar-item r-item" onClick={this.handleClick}>Add product</NavLink>
                                <NavLink to="/admin/stats" activeClassName="active" className="navbar-item r-item" onClick={this.handleClick}>Statistics</NavLink>
                            </div>
                            {this.props.isLoggedIn ?
                                <div className="navbar-end">
                                    <div className="navbar-item">
                                        <div className="buttons">
                                            <div className="welcometxt">
                                                <p className="is-inline welcome">Welcome, <strong className="text">{Auth.getData().firstName}</strong>!</p>
                                            </div>
                                            <NavLink to="/" className="button is-light" activeClassName="" onClick={this.handleClick}><strong>Home</strong></NavLink>
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