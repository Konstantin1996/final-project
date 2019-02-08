import React, { Component } from 'react';
import './App.css';
import Pokemon from './components/Pokemon';
import Menu from './layout/Menu';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import DetailedPokemon from './components/DetailedPokemon';
import SimpleStorage, { clearStorage }  from "react-simple-storage";
// import 'bulma/css/bulma.css'

// For IE 11
import 'core-js/fn/array/find';
import "babel-polyfill";
require('es6-promise').polyfill();
require('isomorphic-fetch');



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      pokemonsIds: [],
      catchedIds: [],
      catchedPokemons: [],
      buttons: [],
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/pokemons?_limit=10')
      .then(res => res.json())
      .then((json) => {
        this.setState(function () {

          var buttonsDefaults = null;
          if (!localStorage.getItem('_buttons')) {
            buttonsDefaults = [0, false, false, false, false, false, false, false, false, false, false];
          } else {
            buttonsDefaults = JSON.parse(localStorage.getItem('_buttons'));
          }

          let ids = json.map((data) => data.id);
          return { pokemons: [...json], pokemonsIds: [...ids], buttons: buttonsDefaults }

        });
      })
      .catch(error => console.log(error))
  }

  loadMorePokemons = (e) => {
    fetch(`http://localhost:3001/pokemons?_start=${this.state.pokemons.length}&_end=${this.state.pokemons.length + 10}`)
      .then(res => res.json())
      .then((json) => {
        this.setState(
          function (prev) {
            let buttonsDefaults = [0, false, false, false, false, false, false, false, false, false, false];
            let ids = json.map((data) => data.id);
            console.log(ids);
            return { pokemons: [...this.state.pokemons, ...json], pokemonsIds: [...prev.pokemonsIds, ...ids], buttons: [...prev.buttons, ...buttonsDefaults] }
          }
        );
      })
      .catch(error => console.log(error))
  }

  addToCatchedPokemons = (id, name, catched, catchedDate, catchedTime) => {
    console.log('Adding...')
    if (this.state.catchedIds.indexOf(id) === -1) {
      const newPokemon = {
        id: id,
        name: name,
        catched: catched,
        catchedDate: catchedDate,
        catchedTime: catchedTime
      }
      console.log(id, name, catched, catchedDate, catchedTime);
      this.setState({ catchedIds: [...this.state.catchedIds, id] });
      this.setState({ catchedPokemons: [...this.state.catchedPokemons, newPokemon] });
    } else {
      console.log('THIS POKEMON ALREADY EXISTS!!!');
    }
  }

  showCatchedPokemons = (catchedPokemons) => {
    if (catchedPokemons.length !== 0) {
      return (
        <section className="pokemons">
          {catchedPokemons.map((pokemon) => {
            return (
              <Pokemon key={pokemon.id} id={pokemon.id} name={pokemon.name} catched={pokemon.catched} showButton={false} />
            )
          })}
        </section>
      )
    } else {
      return (
        <p>You didn't catch pokemons:(</p>
      )
    }
  }


  showSinglePokemon(props) {
    let singleCatched = '';
    let singlePokemon = '';
    if (this.state.catchedIds.indexOf(parseInt(props.match.params.id) !== -1)) {

      console.log(this.state.catchedPokemons);
      singleCatched = this.state.catchedPokemons.find((pokemon) => {
  
        console.log(pokemon);
        if (pokemon.id === parseInt(props.match.params.id)) {
    
          return pokemon;
        }

      })
    }

    if (this.state.pokemonsIds.indexOf(parseInt(props.match.params.id) !== -1)) {

      singlePokemon = this.state.pokemons.find((pokemon) => {
  
        if (pokemon.id === parseInt(props.match.params.id)) {
    
          return pokemon;
        }
      })
    }

    console.log(singlePokemon);
    console.log(singleCatched);
    if (singleCatched !== undefined) {

      return (<DetailedPokemon id={singleCatched.id} name={singleCatched.name} catched={singleCatched.catched} catchedDate={singleCatched.catchedDate} catchedTime={singleCatched.catchedTime} showAddInfo={true} />);
    } else {
      return (<DetailedPokemon id={singlePokemon.id} name={singlePokemon.name} showAddInfo={false} />)
    }
  }

  disableButton = (id) => {
    
    console.log(id);
    this.setState({
      buttons: [...this.state.buttons.map((button, index) => ((index === id) || (button)) ? true : false)]
    })

  }

  showAllPokemons() {

    const pokemons = this.state.pokemons.map((pokemon) => {
      
      return <Pokemon key={pokemon.id} id={pokemon.id} dis={this.state.buttons[pokemon.id]} name={pokemon.name} disableButton={this.disableButton} addToCatchedPokemons={this.addToCatchedPokemons} showButton={true} />
    })
    return (
      <React.Fragment>
        <section className="pokemons">
          {pokemons}
        </section>
        <Link className="load-more" to="/" onClick={this.loadMorePokemons}>Load More</Link>
      </React.Fragment>
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
            <Route path="/catched_pokemons" render={this.showCatchedPokemons.bind(this, this.state.catchedPokemons)} />
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
