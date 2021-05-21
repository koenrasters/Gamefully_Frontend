import React, {Component} from 'react';
import Auth from "../Auth/Auth";
import {Redirect} from "react-router-dom";
import EditGame from "./EditProduct/EditGame";
import EditAccessory from "./EditProduct/EditAccessory";
import EditConsole from "./EditProduct/EditConsole";

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            category: this.props.match.params.category
        }
    }

    componentDidMount() {
        this.props.setAdminBar(true);
        let string = this.props.location.pathname;
        if(string!="/admin/edit")
        {
            let parts = string.split("/");
            parts.splice(0, 3);
            this.setState({category: parts[0], id: parts[1]})
        }
    }

    getComponent(category, id)
    {
        if(category == "games")
        {
            return <EditGame getId={id}/>
        }
        else if(category == "consoles")
        {
            return <EditConsole getId={id}/>
        }
        else
        {
            return <EditAccessory getId={id}/>
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
                <h1 className="title">Edit product</h1>
                {this.getComponent(this.state.category, this.state.id)}
            </div>
        );
    }
}

export default EditProduct;