import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./Menu.css";

export class Menu extends Component {
    render() {
        return (
            <header>
                <h1 className="main-title">pokedex</h1>
                <nav className="navigation" >
                    <Link className="nav-first-link" to='/'>Home</Link>
                    <Link className="nav-link" to="/catched_pokemons">Your Pokemons</Link>
                </nav>
            </header>
        )
    }
}

export default Menu
