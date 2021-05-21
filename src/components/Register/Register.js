import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import API from "../API/API";
import './Register.css'

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPass: '',
            firstName: '',
            lastName: '',
            address: '',
            zipCode: '',
            city: '',
            phoneNumber: '',
            samePass: '',
            registered: 0
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(event.target.value);
    }

    confirmChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(this.state.password);
        console.log(this.state.confirmPass);

        if(this.state.password == event.target.value)
        {
            this.setState({samePass: "t"});
        }
        else
        {
            this.setState({samePass: "f"});
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
            zipCode: this.state.zipCode,
            city: this.state.city,
            phoneNumber: this.state.phoneNumber
        };

        await API.post(`user/register`,  user)
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.setState({registered : res.status})
            })
    }

    getComponent(){
        switch(this.state.samePass){
            case '':
                return;
            case 't':
                return <p className="help is-success">Passwords match</p>;
            case 'f':
                return <p className="help is-danger">Passwords don't match</p>;
        }
    }


    render() {
        if(this.props.isLoggedIn || this.state.registered == 201)
        {
            return <Redirect to="/login"/>
        }
        return (
            <div>
                <div className="container">
                    <form id="post" onSubmit={this.handleSubmit}>
                        <div className="field">
                            <label className="label">First Name</label>
                            <div className="control has-icons-left">
                                <input onChange={this.handleChange} className="input" type="text" name="firstName" placeholder="Put here the first name"/>
                                <span className="icon is-small is-left">
                                    <i className="far fa-user"></i>
                                </span>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Last Name</label>
                            <div className="control has-icons-left">
                                <input onChange={this.handleChange} className="input" type="text" name="lastName" placeholder="Put here the last name"/>
                                <span className="icon is-small is-left">
                                    <i className="far fa-user"></i>
                                </span>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">E-mail</label>
                            <div className="control has-icons-left">
                                <input onChange={this.handleChange} className="input" type="email" name="email" placeholder="Put here the e-mail address"/>
                                <span className="icon is-small is-left">
                                    <i className="far fa-envelope"></i>
                                </span>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Address</label>
                            <div className="control has-icons-left">
                                <input onChange={this.handleChange} className="input" type="text" name="address" placeholder="Put here the address"/>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-map-marker-alt"></i>
                                </span>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">City</label>
                            <div className="control has-icons-left">
                                <input onChange={this.handleChange} className="input" type="text" name="city" placeholder="Put here the city"/>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-city"></i>
                                </span>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Zip code</label>
                            <div className="control has-icons-left">
                                <input onChange={this.handleChange} className="input" type="text" name="zipCode" placeholder="Put here the zipcode"/>
                                <span className="icon is-small is-left">
                                    <i className="far fa-map"></i>
                                </span>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Phone Number</label>
                            <div className="control has-icons-left">
                                <input onChange={this.handleChange} className="input" type="text" name="phoneNumber" placeholder="Put here your phone number"/>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-mobile-alt"></i>
                                </span>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control has-icons-left">
                                <input onChange={this.handleChange} className="input" type="password" name="password" placeholder="Put here your password"/>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Confirm Password</label>
                            <div className="control has-icons-left">
                                <input onChange={this.confirmChange} className="input" type="password" name="confirmPass" placeholder="Confirm password"/>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </div>
                            {this.getComponent()}
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button type="submit" className="button is-link">Submit</button>
                            </div>
                        </div>
                    </form>
                    <br/>
                </div>
            </div>
        );
    }
}

export default Register;