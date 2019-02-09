import React, { Component } from 'react';
import './App.css';
import Pokemon from './components/Pokemon';
import Menu from './components/layout/Menu';
import update from 'react-addons-update';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import SimpleStorage, { clearStorage } from "react-simple-storage";

// For IE 11
import "babel-polyfill";
import "isomorphic-fetch";
import 'core-js/es6/promise';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      catchedPokemons: [],
    }
  }

  componentDidMount() {
    // On first load get 10 pokemons
    fetch('http://localhost:3001/pokemons?_limit=10')
      .then(res => res.json())
      .then((json) => {
        this.setState(function () {
          let localCatched = JSON.parse(localStorage.getItem('_catchedPokemons'));
          json.forEach(function (data) {
            // if catched pokemon exists in local storage then get the date,time,status from it
            let index = localCatched.findIndex((pokemon) => pokemon.id === data.id);
            if (index !== -1) {
              data.catched = localCatched[index].catched;
              data.catchedDate = localCatched[index].catchedDate;
              data.catchedTime = localCatched[index].catchedTime;
            } else {
              data.catched = false;
              data.catchedDate = '';
              data.catchedTime = '';
            }
          })

          return { pokemons: [...json] }
        });
      })
      .catch(error => console.log(error))
  }

  loadMorePokemons = (e) => {
    // Load pokemons by portions (10 pokemons per load) amd write them to the state
    fetch(`http://localhost:3001/pokemons?_start=${this.state.pokemons.length}&_end=${this.state.pokemons.length + 10}`)
      .then(res => res.json())
      .then((json) => {
        this.setState(
          function (prev) {
            let localCatched = JSON.parse(localStorage.getItem('_catchedPokemons'));
            json.forEach(function (data) {
              let index = localCatched.findIndex((pokemon) => pokemon.id === data.id);
              if (index !== -1) {
                data.catched = localCatched[index].catched;
                data.catchedDate = localCatched[index].catchedDate;
                data.catchedTime = localCatched[index].catchedTime;
              } else {
                data.catched = false;
                data.catchedDate = '';
                data.catchedTime = '';
              }
            })
            return { pokemons: [...this.state.pokemons, ...json] }
          }
        );
      })
      .catch(error => console.log(error))
  }


  showAllPokemons = () => {
    const pokemons = this.state.pokemons.map((pokemon) => {
      return <Pokemon showButton={true} key={pokemon.id} showAddition={false} id={pokemon.id} name={pokemon.name} catched={pokemon.catched} catchedDate={pokemon.catchedDate} catchedTime={pokemon.catchedTime} catchPokemon={this.catchPokemon} />
    })
    return (
      <React.Fragment>
        <section className="pokemons">
          {pokemons}
        </section>
        <Link className="load-more" to="/" onClick={this.loadMorePokemons}>Load More</Link>
      </React.Fragment>
    )
  }

  catchPokemon = (id, name) => {
    // Use immutability helpers to update one pokemon in the array and after that add this to catched pokemons list
    this.setState(
      { pokemons: update(this.state.pokemons, { [id - 1]: { $set: { id: id, name: name, catched: true, catchedDate: new Date().toLocaleDateString(), catchedTime: new Date().toLocaleTimeString(), } } }) },

      () => {
        this.setState({ catchedPokemons: [...this.state.catchedPokemons, this.state.pokemons[id - 1]] })
      })
  }

  showSinglePokemon = (props) => {
    let singlePokemon = this.state.pokemons[props.match.params.id - 1];
    if (singlePokemon.catched) {
      return <Pokemon showSingle={true} showButton={false} showAddition={true} showDate={true} showTime={true} id={singlePokemon.id} name={singlePokemon.name} catched={singlePokemon.catched} catchedDate={singlePokemon.catchedDate} catchedTime={singlePokemon.catchedTime} />
    } else {
      return <Pokemon showSingle={true} showButton={false} showAddition={true} showDate={false} showTime={false} id={singlePokemon.id} name={singlePokemon.name} catched={singlePokemon.catched} catchedDate={singlePokemon.catchedDate} catchedTime={singlePokemon.catchedTime} />
    }
  }

  showCatchedPokemons = () => {
    let catchedPokemons = this.state.catchedPokemons.map((pokemon) => {
      return <Pokemon key={pokemon.id} showButton={false} key={pokemon.id} showAddition={false} id={pokemon.id} name={pokemon.name} catched={pokemon.catched} catchedDate={pokemon.catchedDate} catchedTime={pokemon.catchedTime} catchPokemon={this.catchPokemon} />
    })

    return (
      <section className="pokemons">
        {catchedPokemons}
      </section>
    );
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Menu />
          <main>
            <SimpleStorage parent={this} />
            <Route exact path="/" render={this.showAllPokemons.bind(this)} />
            <Route path="/pokemon/:id" render={this.showSinglePokemon.bind(this)} />
            <Route path="/catched_pokemons" render={this.showCatchedPokemons.bind(this)} />
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
