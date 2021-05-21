import React, {Component} from 'react';
import API from "../../API/API";

const initialState = {
    description: "",
    ean: "",
    platform: "",
    purchasePrice: 0,
    sellingPrice: 0,
    title: "",
    pegi: 0,
    allGenres: [],
    genresToAdd: [],
    checkFalse: false
}

class AddGame extends Component {
    constructor(props) {
        super(props);
        this.state = initialState
    }

    async componentDidMount() {
        await API.get(`/games/genres`)
            .then(res => {
                const genres = res.data;
                this.setState({allGenres: genres})
            })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleGenre = () => {
        const checkboxes = document.getElementsByName("genre");
        const genres = [];
        for (let i = 0; i < checkboxes.length; i++) {
            if(checkboxes[i].checked)
            {
                let json = JSON.parse(`{ "id": ${parseInt(checkboxes[i].defaultValue)}}`);
                genres[i] = json;
            }
        }
        this.setState({genresToAdd: genres})
        console.log(genres)
    }

    handleSubmit = async event => {
        event.preventDefault();
        let title = this.state.title
        let description = this.state.description
        let ean = this.state.ean
        let platform = this.state.platform
        let purchasePrice = this.state.purchasePrice
        let sellingPrice = this.state.sellingPrice
        let genres = this.state.genresToAdd
        let pegi = this.state.pegi
        if(title=="" || description=="" || ean=="" || platform=="" || purchasePrice=="" || sellingPrice=="" || genres.length==0 || pegi=="")
        {
            this.setState({checkFalse: true})
            return;
        }
        else
        {
            this.setState({checkFalse: false})
        }

        const game = {
            title: title,
            description: description,
            ean: ean,
            platform: platform,
            purchasePrice: purchasePrice,
            sellingPrice: sellingPrice,
            genres: genres,
            pegi: pegi,
            category: "Games"
        };

        await API.post(`games/`, game)
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
                            <input className="input" type="text" value={"Games"} disabled/>
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
                        <label className="label">Genres</label>
                        <div className="columns">
                            {this.state.allGenres.map(genre =>
                                <div className="control column is-4" key={genre.id}>
                                    <label><input onChange={this.handleGenre} className="checkbox" type="checkbox" name="genre" id={"checkbox" + genre.id} value={genre.id}/> {genre.title}</label>
                                </div>
                            )}
                        </div>
                        {this.state.checkFalse && this.state.genresToAdd.length==0 &&
                        <p className="help is-danger">Select at least one genre</p>}
                    </div>

                    <div className="field">
                        <label className="label">Pegi</label>
                        <div className="control">
                            <input onChange={this.handleChange} className="input" type="number" min="0" name="pegi" placeholder="Put here the pegi age"/>
                            {this.state.checkFalse && this.state.pegi=="" &&
                            <p className="help is-danger">Fill in a pegi age</p>}
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

export default AddGame;