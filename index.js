import './styles.scss';


var palabras=["calavera","tarantula", "ahorcado", "secuestro", "muerte", "negro", "ataud","cementerio","esqueleto","horca","suicidio","sangre","cadenas","cenizas","panteon","lapida","momia","vampiro","inmortal","zombie"];
var abecedario=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"];

function Juego(arr){

    //Inicia el juego solo la primera vez que se abre, ya que si establecemos los listeners
    //en cada inicio de juego, se ralentiza.
    this.iniciarJuego=function(){
        this.estadoInicial();
        this.establecerListeners();
    }

    //Se ejecuta cada vez que se inicia un juego. Reinicia todas las variables.
    this.estadoInicial=function(){
        
        this.vidas=10;
        this.palabra=arr[Math.floor(Math.random()*arr.length)];
        this.palabrahidden='_'.repeat(this.palabra.length).split("");
        this.pintarPalabra();
        this.pintarVidas();
        this.reiniciarLetras();
        this.activarForm();
        this.reiniciarForm();
        //console.log(this.palabra);
    }

    //Pinta en el HTML la palabra escondida.
    this.pintarPalabra=function(){
        document.getElementById("blanks").innerHTML=this.palabrahidden.join("");
    }

    //Pinta en el HTML el nº de vidas actual.
    this.pintarVidas=function(){
        document.getElementById("lifes").innerHTML="Número de vidas: "+ this.vidas;
    }

    //Pinta en el HTML la letra que se ha dicho.
    this.pintarLetra=function(letra){
        var i=abecedario.indexOf(letra);
        var letras=document.getElementsByClassName("letra");
        if(i>=0){
        letras[i].style.backgroundColor="rgb(87, 7, 7)";
        }
    }

    this.reiniciarLetras=function(){
        var letras=document.getElementsByClassName("letra");
        for(var i=0;i<letras.length;i++){
            letras[i].style.backgroundColor="rgba(0,0,0,0)";
        }
    }

    this.juegoGanado=function(){
        document.getElementById("submit-button").disabled=true;
        document.getElementById("blanks").innerHTML="YOU WIN!!";
        document.getElementById("input-guess").disabled=true;
    }

    this.juegoPerdido=function(){
        document.getElementById("submit-button").disabled=true;
        document.getElementById("blanks").innerHTML="GAME OVER!!";
        document.getElementById("input-guess").disabled=true;
    }

    this.reiniciarForm=function(){
        document.getElementById("guess-form").reset();
        document.getElementById("input-guess").focus();
    }

    this.activarForm=function(){
        document.getElementById("submit-button").disabled=false;
        document.getElementById("input-guess").disabled=false;
    }


    this.gestionarLetra=function(letra){
        if(this.palabra.includes(letra)){
            for(var i=0;i<this.palabra.length;i++){
                if(this.palabra[i]===letra){
                    this.palabrahidden[i]=letra;
                }
            }
            this.pintarPalabra();
            if(!this.palabrahidden.includes("_")){
                this.juegoGanado();
            }
        }else{
            this.vidas--;
            this.pintarVidas();
            if(this.vidas===0){
                this.juegoPerdido();
            }
        }
        this.reiniciarForm();
        this.pintarLetra(letra);        
    }

    this.establecerListeners=function(){
        var ref=this;
        document.getElementById('guess-form').addEventListener('submit', function(e){
            var inputLetter = document.getElementById('input-guess').value;
            ref.gestionarLetra(inputLetter.toLowerCase());
        });
        document.getElementById('reset-button').addEventListener('click', function(e){
           ref.estadoInicial();
        });

    }

}

var ahorcado=new Juego(palabras);

ahorcado.iniciarJuego();


