import React, { Component } from 'react';
import './App.scss';
import './components/LetterList';
import LetterList from './components/LetterList';

var palabras = ["calavera", "tarantula", "ahorcado", "secuestro", "muerte", "negro", "ataud", "cementerio", "esqueleto", "horca", "suicidio", "sangre", "cadenas", "cenizas", "panteon", "lapida", "momia", "vampiro", "inmortal", "zombie"];
var palab = palabras[Math.floor(Math.random() * palabras.length)];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      abc: [
        { letter: 'a', said: false },
        { letter: 'b', said: false },
        { letter: 'c', said: false },
        { letter: 'd', said: false },
        { letter: 'e', said: false },
        { letter: 'f', said: false },
        { letter: 'g', said: false },
        { letter: 'h', said: false },
        { letter: 'i', said: false },
        { letter: 'j', said: false },
        { letter: 'k', said: false },
        { letter: 'l', said: false },
        { letter: 'm', said: false },
        { letter: 'n', said: false },
        { letter: 'ñ', said: false },
        { letter: 'o', said: false },
        { letter: 'p', said: false },
        { letter: 'q', said: false },
        { letter: 'r', said: false },
        { letter: 's', said: false },
        { letter: 't', said: false },
        { letter: 'u', said: false },
        { letter: 'v', said: false },
        { letter: 'w', said: false },
        { letter: 'x', said: false },
        { letter: 'y', said: false },
        { letter: 'z', said: false },
      ],
      vidas: 10,
      palabra: palab,
      palabrahidden: '_'.repeat(palab.length).split(""),
      estado: 'jugando'


    }

    // console.log(this.state.palabrahidden);
  }

  desactivarLetras = () => {
    const { abc } = this.state;
    const newArray = abc.map((elem) => {
      elem.said = true;
      return elem;
    });
    this.setState({ abc: newArray });
  }

  gestionarLetra = (letra) => {
    // console.log('Gestionando Letra '+letra);
    const { vidas, palabra, palabrahidden, estado } = this.state;
    var estadoN = estado;
    var vidasN = vidas;
    var palabrah = palabrahidden.slice();

    if (palabra.includes(letra)) {
      for (var i = 0; i < palabra.length; i++) {
        if (palabra[i] === letra) {
          palabrah[i] = letra;

        }
      }

      if (!palabrah.includes("_")) {
        this.desactivarLetras();
        estadoN = 'ganado';
      }
    } else {
      vidasN--;
      if (vidasN === 0) {
        this.desactivarLetras();
        estadoN = 'perdido';
      }
    }
    // console.log(palabrahidden);
    this.setState({ vidas: vidasN, palabra, palabrahidden: palabrah, estado: estadoN });
  }

  onSaid = (letra) => {

    this.gestionarLetra(letra);
    // console.log(letra);
    const { abc } = this.state;
    // console.log(abc);
    const newAbc = abc.map((elem) => {
      if (elem.letter === letra) {
        elem.said = true;
      }
      return elem;
    });
    this.setState({ abc: newAbc });
  }



  render() {
    const { abc, vidas, palabrahidden, estado } = this.state;
    return (
      <div className="App">
        <div className="global">
          <h1 id="message">Hangman's Game</h1>
          {estado === 'ganado' && <div class="mensajeFinal">Has Ganado!!</div>}
          {estado === 'perdido' && <div class="mensajeFinal">-Game Over-</div>}
          <div id="letras-container">
            <LetterList letras={abc} onSaid={this.onSaid}></LetterList>
          </div>
          <div id="lifes">Vidas: {vidas}</div>
          <div id="blanks">{palabrahidden}</div>
        </div>

      </div>
    );
  }
}

export default App;
