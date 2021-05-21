import React, {Component} from 'react';
import Auth from "../Auth/Auth";
import {Redirect} from "react-router-dom";

class Statistics extends Component {
    componentDidMount() {
        this.props.setAdminBar(true);
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
                <h1 className="title">Statistics</h1>
            </div>
        );
    }
}

export default Statistics;