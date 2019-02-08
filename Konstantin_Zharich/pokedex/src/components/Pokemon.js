import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Pokemon.css';


export class Pokemon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            catched: false,
            catchedDate: '',
            catchedTime: '',
        }
    }

    catchPokemon = (event) => {

        this.props.disableButton.call(this, this.props.id);

        const dateString = new Date().toLocaleDateString();
        const timeString = new Date().toLocaleTimeString();

        this.setState({ catched: true });
        this.setState({ catchedDate: dateString });
        this.setState({ catchedTime: timeString }, function () {
            this.props.addToCatchedPokemons(this.props.id, this.props.name, this.state.catched, this.state.catchedDate, this.state.catchedTime);
        });

    }

    render() {
        return (

            <div className="pokemon-item">
                <div className="pokemon-item-wrapper">
                    <h2 className="pokemon-name">{this.props.name}</h2>
                    <Link to={`/pokemon/${this.props.id}`}><img src={window.location.origin + `/pokemons/${this.props.id}.png`} alt="Pokemon" height="200px" /></Link>
                </div>
                {/* fas fa-hand-holding-heart */}
                {/* {this.props.showAddInfo ? <AdditionalInfo id={this.props.id} catched={this.state.catched} catchedDate={this.state.catchedDate} catchedTime={this.state.catchedTime} /> : null} */}
                {this.props.showButton ? <button className="btn-catch far fa-hand-paper" disabled={this.props.dis} onClick={this.catchPokemon}></button> : null}
            </div>

        )
    }
}

export default Pokemon
