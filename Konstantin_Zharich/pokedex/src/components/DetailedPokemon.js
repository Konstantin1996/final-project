import React, { Component } from 'react';
import AdditionalInfo from './AdditionalInfo';
import { Link } from 'react-router-dom';
import "./DetailedPokemon.css";

export class DetailedPokemon extends Component {
    render() {
        return (
                <section className="pokemon">
                    <div className="single-pokemon-item">
                        <div className="single-pokemon-wrapper">
                            <h2>{this.props.name}</h2>
                            <Link to={`/pokemon/${this.props.id}`}><img src={window.location.origin + `/pokemons/${this.props.id}.png`} alt="Pokemon" height="200px" /></Link>
                            <p>ID: {this.props.id}</p>
                            <p>Status: {this.props.catched ? ('Catched') : ('Not Catched')} </p>
                        </div>
                        {this.props.showAddInfo ? <AdditionalInfo id={this.props.id} catched={this.props.catched} catchedDate={this.props.catchedDate} catchedTime={this.props.catchedTime} /> : null}
                    </div>
                </section>
        )
    }
}

export default DetailedPokemon
