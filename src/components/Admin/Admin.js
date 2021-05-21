import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import Auth from "../Auth/Auth";
import API from "../API/API";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            searchTerm: "",
            stockQuantity: ""
        }
    }

    async componentDidMount() {
        await API.get('')
            .then(res => {
                const products = res.data;
                this.setState({ products: products });
            })
        this.props.setAdminBar(true);
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    searchItem = async() =>
    {
        if(this.state.searchTerm.length == 0 || this.state.searchTerm.length> 2)
            await API.get(`?UpdatedAt-asc;${this.state.searchTerm}`)
                .then(res => {
                    const products = res.data;
                    this.setState({products : products});
                })

    }

    deleteProduct = async (id) =>
    {
        await API.delete(`/${id}`)
            .then(res => {
                console.log(res.status)
            })
        await this.componentDidMount()
    }

    editProduct = (category, id) =>
    {
        let link;
        if(category == "Games")
        {
            link = "games";
        }
        else if(category == "Consoles")
        {
            link = "consoles"
        }
        else
        {
            link = "accessories"
        }
        return "/admin/edit/" + link + "/" + id;

    }

    editStock = async (id) =>
    {
        await API.put(`/stock/quantity/${id}`, this.state.stockQuantity);
        document.getElementById("stockInput" + id).value = '';

        await this.componentDidMount();
    }

    render() {
        if(Auth.getRole() == 0)
        {
            console.log("jan")
            return <Redirect to="/login"/>
        }
        return (
            <div className="container pt-3">
                <h1 className="title">Products</h1>
                <div className="control">
                    <input  onChange={this.handleChange} onKeyUp={this.searchItem} className="input" type="text" name="searchTerm" placeholder="search here for products"/>

                </div>
                {this.state.products.length == 0 &&
                    <p>Cannot find any products</p>
                }
                <table className="table is-fullwidth is-hoverable">
                    <tbody>
                    {this.state.products.map(product =>
                        <tr key={product.id}>
                            <th style={{width: "64px"}}>
                                <figure className="image is-64x64">
                                    <img src="https://bulma.io/images/placeholders/128x128.png"/>
                                </figure>
                            </th>

                            <td>
                                <p><strong>{product.title}</strong></p>
                                <span className="tag">{product.category}</span>
                            </td>
                            <td>
                                <p><strong>Stock:</strong> {product.stock.quantity}</p>
                                <div className="field has-addons pt-2">
                                    <div className="control">
                                        <input onChange={this.handleChange} className="input" type="number" name="stockQuantity" placeholder="Change stock quantity" id={"stockInput"+ product.id}/>
                                    </div>
                                    <div className="control">
                                        <a onClick={() => this.editStock(product.id)} className="button is-info">
                                            Edit
                                        </a>
                                    </div>
                                </div>
                            </td>
                            <td style={{width: "10%"}}>
                                <p className="is-size-4"><strong>€{product.sellingPrice}</strong></p>
                                <br/>
                            </td>
                            <td style={{width: "10%"}}>
                                <a href={this.editProduct(product.category, product.id)}>Edit <i className="fas fa-edit"></i></a>
                            </td>
                            <td style={{width: "10%"}}>
                                <a onClick={() => this.deleteProduct(product.id)}>Delete <i className="far fa-trash-alt"></i></a>
                            </td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        );
    }
}

export default Admin;