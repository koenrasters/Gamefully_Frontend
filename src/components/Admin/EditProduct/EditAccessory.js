import React, {Component} from 'react';
import API from "../../API/API";

class EditAccessory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accessory: [],
            id: 0,
            description: "",
            ean: "",
            platform: "",
            purchasePrice: 0,
            sellingPrice: 0,
            title: "",
            brand: "",
            color: ""
        }
    }

    async componentDidMount() {
        let id = this.props.getId;
        console.log(id)
        this.setState({id: id})
        await API.get(`/accessories/${id}`)
            .then(res => {
                const accessory = res.data;
                this.setState({accessory: accessory});
                this.setState({description: accessory.description, ean: accessory.ean, platform: accessory.platform, purchasePrice: accessory.purchasePrice, sellingPrice: accessory.sellingPrice, title: accessory.title, brand: accessory.brand, color: accessory.color})
                console.log(accessory)
            })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(event.target.value)
    }


    handleSubmit = async event => {
        event.preventDefault();
        const accessory = {
            title: this.state.title,
            description: this.state.description,
            ean: this.state.ean,
            platform: this.state.platform,
            purchasePrice: this.state.purchasePrice,
            sellingPrice: this.state.sellingPrice,
            brand: this.state.brand,
            color: this.state.color,
            category: this.state.accessory.category
        };

        await API.put(`accessories/${this.state.id}`, accessory)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        await this.componentDidMount()
    }

    render() {
        return (
            <div>
                <form id="post" onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input onChange={this.handleChange} className="input" type="text" name="title" placeholder="Put here the title" value={this.state.title}/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Description</label>
                        <div className="control">
                            <input onChange={this.handleChange} className="input" type="text" name="description" placeholder="Put here the description" value={this.state.description}/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">EAN</label>
                        <div className="control">
                            <input className="input" type="text" value={this.state.ean} disabled/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Platform</label>
                        <div className="control">
                            <input className="input" type="text" value={this.state.platform} disabled/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Category</label>
                        <div className="control">
                            <input className="input" type="text" value={this.state.accessory.category} disabled/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Purchase Price</label>
                        <div className="control">
                            <input onChange={this.handleChange} className="input" type="text" name="purchasePrice" placeholder="Put here the purchase price" value={this.state.purchasePrice}/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Selling Price</label>
                        <div className="control">
                            <input onChange={this.handleChange} className="input" type="text" name="sellingPrice" placeholder="Put here the selling price" value={this.state.sellingPrice}/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Brand</label>
                        <div className="control">
                            <input onChange={this.handleChange} className="input" type="text" name="brand" placeholder="Put here the brand" value={this.state.brand}/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Color</label>
                        <div className="control">
                            <input onChange={this.handleChange} className="input" type="text" name="color" placeholder="Put here the color" value={this.state.color}/>
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <button type="submit" className="button is-link">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default EditAccessory;