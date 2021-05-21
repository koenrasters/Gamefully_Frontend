import React, {Component} from 'react';
import API from "../../API/API";

const initialState = {
    description: "",
    ean: "",
    platform: "",
    purchasePrice: 0,
    sellingPrice: 0,
    title: "",
    brand: "",
    color: "",
    storage: "",
    checkFalse: false
}

class AddConsole extends Component {
    constructor(props) {
        super(props);
        this.state = initialState
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        let title = this.state.title
        let description = this.state.description
        let ean = this.state.ean
        let platform = this.state.platform
        let purchasePrice = this.state.purchasePrice
        let sellingPrice = this.state.sellingPrice
        let brand = this.state.brand
        let color = this.state.color
        let storage = this.state.storage;

        if(title=="" || description=="" || ean=="" || platform=="" || purchasePrice=="" || sellingPrice=="" || brand=="" || color=="" || storage=="")
        {
            this.setState({checkFalse: true})
            return;
        }
        else
        {
            this.setState({checkFalse: false})
        }

        const consol = {
            title: title,
            description: description,
            ean: ean,
            platform: platform,
            purchasePrice: purchasePrice,
            sellingPrice: sellingPrice,
            brand: brand,
            color: color,
            storage: storage,
            category: "Consoles"
        };

        await API.post(`consoles/`, consol)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        document.getElementById("post").reset()
        window.scrollTo({ top: 0, behavior: `smooth` })
        this.setState(initialState)
    }

    render() {
        return (
            <div className="pt-2">
                <form id="post" onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input onChange={this.handleChange} className="input" type="text" name="title" placeholder="Put here the title"/>
                            {this.state.checkFalse && this.state.title=="" &&
                            <p className="help is-danger">Fill in a title</p>}
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Description</label>
                        <div className="control">
                            <input onChange={this.handleChange} className="input" type="text" name="description" placeholder="Put here the description" />
                            {this.state.checkFalse && this.state.description=="" &&
                            <p className="help is-danger">Fill in a description</p>}
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">EAN</label>
                        <div className="control">
                            <input className="input" onChange={this.handleChange} name="ean" type="text" placeholder="Put here the EAN"/>
                            {this.state.checkFalse && this.state.ean=="" &&
                            <p className="help is-danger">Fill in a EAN</p>}
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Platform</label>
                        <div className="select is-full">
                            <select onChange={this.handleChange} defaultValue="" name="platform">
                                <option value="" disabled hidden>Choose here to select a platform</option>
                                <option value="PS4">PS4</option>
                                <option value="PS5">PS5</option>
                                <option value="XBOX One X">XBOX One X</option>
                                <option value="XBOX One S">XBOX One S</option>
                                <option value="XBOX Series X">XBOX Series X</option>
                                <option value="Switch">Switch</option>
                                <option value="Switch Light">Switch Light</option>
                                <option value="PC">PC</option>
                            </select>
                        </div>
                        {this.state.checkFalse && this.state.platform=="" &&
                        <p className="help is-danger">Select a platform</p>}
                    </div>

                    <div className="field">
                        <label className="label">Category</label>
                        <div className="control">
                            <input className="input" type="text" value={"Consoles"} disabled/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Purchase Price</label>
                        <div className="control">
                            <input onChange={this.handleChange} className="input" type="number" min="0" name="purchasePrice" placeholder="Put here the purchase price"/>
                            {this.state.checkFalse && this.state.purchasePrice=="" &&
                            <p className="help is-danger">Fill in a purchase price</p>}
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Selling Price</label>
                        <div className="control">
                            <input onChange={this.handleChange} className="input" type="number" min="0" name="sellingPrice" placeholder="Put here the selling price"/>
                            {this.state.checkFalse && this.state.sellingPrice=="" &&
                            <p className="help is-danger">Fill in a selling price</p>}
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Brand</label>
                        <div className="control">
                            <input onChange={this.handleChange} className="input" type="text" name="brand" placeholder="Put here the brand"/>
                            {this.state.checkFalse && this.state.brand=="" &&
                            <p className="help is-danger">Fill in a brand</p>}
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Color</label>
                        <div className="control">
                            <input onChange={this.handleChange} className="input" type="text" name="color" placeholder="Put here the color" />
                            {this.state.checkFalse && this.state.color=="" &&
                            <p className="help is-danger">Fill in a color</p>}
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Storage</label>
                        <div className="control">
                            <input onChange={this.handleChange} className="input" type="text" name="storage" placeholder="Put here the storage"/>
                            {this.state.checkFalse && this.state.storage=="" &&
                            <p className="help is-danger">Fill in the storage</p>}
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <button type="submit" className="button is-link">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddConsole;