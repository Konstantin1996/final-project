import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import AdditionalInfo from './AdditionalInfo';
import './Pokemon.css';
import './SinglePokemon.css';

export class Pokemon extends Component {

    render() {
        return (
            this.props.showSingle ?
                <section className="pokemon">
                    <div className="single-pokemon-item">
                        <div className="single-pokemon-wrapper">
                            <h2 className="pokemon-name">{this.props.name}</h2>
                            <Link to={`/pokemon/${this.props.id}`}><img src={window.location.origin + `/pokemons/${this.props.id}.png`} alt="Pokemon" height="200px" /></Link>
                        </div>
                        {this.props.showAddition ? <AdditionalInfo id={this.props.id} showDate={this.props.showDate} showTime={this.props.showTime} catched={this.props.catched} catchedDate={this.props.catchedDate} catchedTime={this.props.catchedTime} /> : null}
                        {this.props.showButton ? <button className="btn-catch far fa-hand-paper" disabled={this.props.catched} onClick={this.props.catchPokemon.bind(this, this.props.id, this.props.name)}></button> : null}
                    </div>
                </section> : <div className="pokemon-item">
                    <div className="pokemon-item-wrapper">
                        <h2 className="pokemon-name">{this.props.name}</h2>
                        <Link to={`/pokemon/${this.props.id}`}><img src={window.location.origin + `/pokemons/${this.props.id}.png`} alt="Pokemon" height="200px" /></Link>
                    </div>
                    {this.props.showAddition ? <AdditionalInfo id={this.props.id} showDate={this.props.showDate} showTime={this.props.showTime} catched={this.props.catched} catchedDate={this.props.catchedDate} catchedTime={this.props.catchedTime} /> : null}
                    {this.props.showButton ? <button className="btn-catch far fa-hand-paper" disabled={this.props.catched} onClick={this.props.catchPokemon.bind(this, this.props.id, this.props.name)}></button> : null}
                </div>
        )
    }
}

export default Pokemon
