import React, {Component} from 'react';
import API from "../API/API";
import {Link} from "react-router-dom";
import Consoles from "../../Media/consoles.jpeg"
import Games from "../../Media/games.jpg"
import Products from "../../Media/products.jpg"
import Accessories from "../../Media/accessories.jpg"

class Home extends Component {
    componentDidMount() {
        this.props.setAdminBar(false);
        this.props.checkLogin()
        this.props.checkCart()
    }

        render() {
        return (
            <div>
                <div className="container">
                    <h1 className="title pt-3">Welcome</h1>
                    <p>Hi welcome to GameFully, this is the site where you can buy everything you need for gaming. Go check around on the site. We got <strong>Games, Consoles and Accessories.</strong></p>
                    <div className="columns">
                        <div className="column">
                            <Link to="/products">
                                <div className="card lit">
                                    <div className="card-content">
                                        <p className="title">All products</p>
                                        <img src={Products}/>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="column">
                            <Link to="/games">
                                <div className="card lit">
                                    <div className="card-content">
                                        <p className="title">Games</p>
                                        <img src={Games}/>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="column">
                            <Link to="/consoles">
                                <div className="card lit">
                                    <div className="card-content">
                                        <p className="title">Consoles</p>
                                        <img src={Consoles}/>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="column">
                            <Link to="/accessories">
                                <div className="card lit">
                                    <div className="card-content">
                                        <p className="title">Accessories</p>
                                        <img src={Accessories}/>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;