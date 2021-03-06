import React, {Component, useState} from 'react';
import API from '../API/API';
import '../Products.css'
import {NavLink} from "react-router-dom";

class Accessories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accessories: [],
            searchTerm: "",
            query: "",
            searchColumn: "",
            distinctColumn: []
        }
    }

    async componentDidMount() {
        await API.get('/accessories/')
            .then(res => {
                const accessories = res.data;
                this.setState({ accessories: accessories });
            })
        await API.get('/accessories/distinct')
            .then(res => {
                const columns = res.data;
                this.setState({ distinctColumn: columns });
                console.log(columns)
            })
    }

    handleChange = event => {
        this.setState({
            searchTerm: event.target.value
        }, this.makeQuery);

    }

    makeQuery = async() =>
    {
        console.log(this.state.searchTerm)
        let query = "";
        query = this.state.searchTerm + ";"+ this.state.searchColumn;
        this.setState({query: query}, await this.searchItem)
    }

    handleColumn = () => {
        const checkboxes = document.getElementsByName("columnCheckBox");
        let queryString = ""
        for (let i = 0; i < checkboxes.length; i++) {
            if(checkboxes[i].checked)
            {
                queryString += checkboxes[i].defaultValue;
            }
        }
        this.setState({searchColumn: queryString}, this.makeQuery)
        console.log(queryString)
    }

    searchItem = async() =>
    {
        if(this.state.searchTerm.length == 0 || this.state.searchTerm.length> 2)
            await API.get(`/accessories/?UpdatedAt-asc;${this.state.query}`)
                .then(res => {
                    const accessories = res.data;
                    this.setState({accessories : accessories});
                })

    }


    render() {
        return (
            <div>
                <div className="container">
                    <div className="columns is-gapless pt-3">
                        <div className="column is-3">
                            <h1 className="title">Filters</h1>
                            <div className="field has-addons pt-2">
                                <div className="control">
                                    <input onChange={this.handleChange} onKeyDown={this.searchItem} className="input" type="text" placeholder="search here for products"/>
                                </div>
                            </div>
                            {this.state.distinctColumn.map(column =>
                                <div key={column.column}>
                                    <p className="is-size-4">
                                        {column.column}
                                    </p>
                                    {column.values.map(value =>
                                        <div key={value}>
                                            <label className="checkbox"><input onChange={this.handleColumn} type="checkbox" value={`${column.column}=${value};`} name="columnCheckBox"/> {value}</label>
                                            <br/>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="column">
                            <h1 className="title">Products</h1>
                            {this.state.accessories.length == 0 &&
                                <p>Cannot find any products</p>
                            }
                            <table className="table is-fullwidth is-hoverable">
                                <tbody>

                                {this.state.accessories.map(accessory =>
                                    <tr key={accessory.id}>
                                        <th style={{width: "128px"}}>
                                            <figure className="image is-128x128">
                                                <img src="https://bulma.io/images/placeholders/128x128.png"/>
                                            </figure>
                                        </th>

                                        <td>
                                            <p><strong>{accessory.title}</strong></p>
                                            <p>{accessory.description}</p>
                                            <span className="tag">{accessory.category}</span>
                                        </td>
                                        <td style={{width: "150px"}}>
                                            <p className="is-size-4"><strong>???{accessory.sellingPrice}</strong></p>
                                            <br/>
                                            <NavLink to={"/product/accessories/" + accessory.id} className="button is-light" style={{color: "#0096e3"}}><strong>Go to product</strong></NavLink>
                                        </td>
                                    </tr>)}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Accessories;