var $ = require('jquery');
import './styles.scss';


var palabras = ["calavera", "tarantula", "ahorcado", "secuestro", "muerte", "negro", "ataud", "cementerio", "esqueleto", "horca", "suicidio", "sangre", "cadenas", "cenizas", "panteon", "lapida", "momia", "vampiro", "inmortal", "zombie"];
var abecedario = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function Juego(arr) {

    //Inicia el juego solo la primera vez que se abre, ya que si establecemos los listeners
    //en cada inicio de juego, se ralentiza.
    this.iniciarJuego = function () {
        this.estadoInicial();
        this.establecerListeners();
    }

    //Se ejecuta cada vez que se inicia un juego. Reinicia todas las variables.
    this.estadoInicial = function () {

        this.vidas = 10;
        this.palabra = arr[Math.floor(Math.random() * arr.length)];
        this.palabrahidden = '_'.repeat(this.palabra.length).split("");
        this.pintarPalabra();
        this.pintarVidas();
        this.reiniciarLetras();
        this.activarForm();
        this.reiniciarForm();
        //console.log(this.palabra);
    }

    //Pinta en el HTML la palabra escondida.
    this.pintarPalabra = function () {
        $('#blanks').html(this.palabrahidden.join(""));
    }

    //Pinta en el HTML el nº de vidas actual.
    this.pintarVidas = function () {
        $('#lifes').html("Número de vidas: " + this.vidas);
    }

    //Pinta en el HTML la letra que se ha dicho.
    this.pintarLetra = function (letra) {
        var i = abecedario.indexOf(letra);
        var letras = $('.letra');
        if (i >= 0) {
            letras[i].style.backgroundColor = "rgb(87, 7, 7)";
        }
    }

    this.reiniciarLetras = function () {
        var letras = $('.letra');
        for (var i = 0; i < letras.length; i++) {
            letras[i].style.backgroundColor = "rgba(0,0,0,0)";
        }
    }

    this.juegoGanado = function () {
        $('#submit-button').prop("disabled", true);
        $('#blanks').html("YOU WIN!!");
        $('#input-guess').prop("disabled", true);
    }

    this.juegoPerdido = function () {
        $('#submit-button').prop("disabled", true);
        $('#blanks').html("GAME OVER!!");
        $('#input-guess').prop("disabled", true);
    }

    this.reiniciarForm = function () {
        $('#guess-form').trigger("reset");
        $('#input-guess').trigger("focus");
    }

    this.activarForm = function () {
        $('#submit-button').prop("disabled", false);
        $('#input-guess').prop("disabled", false);
    }


    this.gestionarLetra = function (letra) {
        var objeto={
            estadoPal:this.palabrahidden.join(""),
            nVidas:this.vidas,
            estadoJuego:"Jugando"
        };

        if (this.palabra.includes(letra) && letra!=="") {
            for (var i = 0; i < this.palabra.length; i++) {
                if (this.palabra[i] === letra) {
                    this.palabrahidden[i] = letra;
                }
            }
            this.pintarPalabra();
            if (!this.palabrahidden.includes("_")) {
                this.juegoGanado();
                objeto.estadoJuego="Ganado";
            }
            objeto.estadoPal=this.palabrahidden.join("");

        } else {
            this.vidas--;
            objeto.nVidas=this.vidas;
            this.pintarVidas();
            if (this.vidas === 0) {
                this.juegoPerdido();
                objeto.estadoJuego="Perdido";
            }
        }
        
        return objeto;
    }

    this.establecerListeners = function () {
        var ref = this;

        $('#guess-form').on('submit', function (e) {
            e.preventDefault();
            var inputLetter = $('#input-guess').val();
            ref.gestionarLetra(inputLetter.toLowerCase());
            ref.reiniciarForm(); 
            ref.pintarLetra(inputLetter);
        });

        $('#reset-button').on('click', function (e) {
            ref.estadoInicial();
        });

    }


}

var ahorcado = new Juego(palabras);

ahorcado.iniciarJuego();

export default Juego;
