import React, {Component} from 'react';
import API from "../../API/API";

class EditGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: [],
            id: 0,
            description: "",
            ean: "",
            platform: "",
            purchasePrice: 0,
            sellingPrice: 0,
            title: "",
            ggenres: [],
            genres: [],
            pegi: 0,
            genresToAdd: []
        }
    }

    async componentDidMount() {
        let id = this.props.getId;
        console.log(id)
        this.setState({id: id})
        await API.get(`/games/${id}`)
            .then(res => {
                const game = res.data;
                this.setState({game: game});
                this.setState({ggenres: game.genres});
                this.setState({description: game.description, ean: game.ean, platform: game.platform, purchasePrice: game.purchasePrice, sellingPrice: game.sellingPrice, title: game.title, pegi: game.pegi})
                console.log(game.genres)
                console.log(game)
            })
        await API.get(`/games/genres`)
            .then(res => {
                const genres = res.data;
                this.setState({genres: genres})
                console.log(genres[0].id)
            })

    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(event.target.value)
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
        const game = {
            title: this.state.title,
            description: this.state.description,
            ean: this.state.ean,
            platform: this.state.platform,
            purchasePrice: this.state.purchasePrice,
            sellingPrice: this.state.sellingPrice,
            genres: this.state.genresToAdd,
            pegi: this.state.pegi,
            category: "Games"
        };

        await API.put(`games/${this.state.id}`, game)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        await this.componentDidMount()
    }

    checkIfGenreContains = (id, title) =>
    {
        let same;
        for (let i = 0; i < this.state.ggenres.length; i++) {
            if(this.state.ggenres[i].id == id)
            {
                same = true;
                break;
            }
        }
        return <label><input onChange={this.handleGenre} className="checkbox" type="checkbox" name="genre" id={"checkbox" + id} value={id} defaultChecked={same}/> {title}</label>

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
                            <input className="input" type="text" value={this.state.game.category} disabled/>
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
                        <label className="label">Genres</label>
                        <div className="columns">
                        {this.state.genres.map(genre =>
                            <div className="control column is-4" key={genre.id}>
                                {this.checkIfGenreContains(genre.id, genre.title)}

                            </div>
                        )}
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Pegi</label>
                        <div className="control">
                            <input onChange={this.handleChange} className="input" type="number" min="0" name="pegi" placeholder="Put here the pegi age" value={this.state.pegi}/>
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

export default EditGame;