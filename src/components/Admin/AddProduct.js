import React, {Component} from 'react';
import Auth from "../Auth/Auth";
import {Redirect} from "react-router-dom";
import AddGame from "./AddProduct/AddGame";
import AddConsole from "./AddProduct/AddConsole";
import AddAccessory from "./AddProduct/AddAccessory";

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: ""
        }
    }

    componentDidMount() {
        this.props.setAdminBar(true);
    }

    handleChange  = event =>
    {
        this.setState({category: event.target.value})
    }

    getComponent()
    {
        console.log(this.state.category)
        if(this.state.category == "games")
        {
            return <AddGame/>
        }
        else if(this.state.category == "consoles")
        {
            return <AddConsole/>
        }
        else if(this.state.category == "Mice" || this.state.category == "Headsets" || this.state.category == "Keyboards" || this.state.category == "Controllers")
        {
            return <AddAccessory category={this.state.category}/>
        }

    }

    render() {
        if(Auth.getRole() == 0)
        {
            console.log("jan")
            return <Redirect to="/login"/>
        }
        return (
            <div className="container pt-3">
                <a onClick={this.props.history.goBack}>
                    <strong>
                        <p>
                            <i className="fas fa-angle-left"></i> Go back
                        </p>
                    </strong>
                </a>
                <h1 className="title">Add product</h1>
                <div className="select">
                    <select onChange={this.handleChange} defaultValue="">
                        <option value="" disabled hidden>Choose here to select a category</option>
                        <option value="games">Game</option>
                        <option value="consoles">Console</option>
                        <option value="Headsets">Headset</option>
                        <option value="Keyboards">Keyboard</option>
                        <option value="Mice">Mouse</option>
                        <option value="Controllers">Controller</option>
                    </select>
                </div>
                {this.getComponent()}
            </div>
        );
    }
}

export default AddProduct;