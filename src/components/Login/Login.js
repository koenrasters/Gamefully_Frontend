import React, {Component} from 'react';
import Auth from "../Auth/Auth";
import { Redirect } from "react-router-dom";
import App from "../../App";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoggedIn: false,
            isFalse: false
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        const credentials = {
            email: this.state.email,
            password: this.state.password
        };

        const bool = await Auth.login(credentials);
        if(bool)
        {
            this.setState({
                isLoggedIn: bool
            });
        }
        else
        {
            this.setState({
                isFalse: true
            })
        }

    }

    componentDidMount() {
        this.setState({
            isLoggedIn: this.props.isLoggedIn
        });
    }


    render() {
        console.log("state of Register " + this.props.isLoggedIn)
        if(this.props.isLoggedIn || this.state.isLoggedIn)
        {
            console.log("jan")
            return <Redirect to="/"/>
        }
        return (
            <div>
                <div className="container">
                    <form id="post" onSubmit={this.handleSubmit}>
                        <div className="field">
                            <label className="label">E-mail</label>
                            <div className="control">
                                <input onChange={this.handleChange} className="input" type="email" name="email" placeholder="Put here the email" autocomplete="on"/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input onChange={this.handleChange} className="input" type="password" name="password" placeholder="Put here the password" autocomplete="on"/>
                                {this.state.isFalse &&
                                    <p className="help is-danger">Wrong e-mail or password</p>}
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button type="submit" className="button is-link">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;