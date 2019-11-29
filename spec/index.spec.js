import Juego from '../src/index.js'


describe('gestion de la letra', function(){

  it('la letra es un simbolo o un numero', function(){
    var juego1=new Juego([]);
    juego1.palabra="calavera";
    juego1.palabrahidden=["_", "_", "_", "_", "_", "_", "_", "_"];
    juego1.vidas=10;

    var result=juego1.gestionarLetra("9");
    expect(result).toEqual({estadoPal:"________", nVidas:9, estadoJuego:"Jugando" });
  })

  it('letra incorrecta pero juego no terminado', function(){
    var juego1=new Juego([]);
    juego1.palabra="calavera";
    juego1.palabrahidden=["_", "_", "_", "_", "_", "_", "_", "_"];
    juego1.vidas=10;

    var result=juego1.gestionarLetra("g");
    expect(result).toEqual({estadoPal:"________", nVidas:9, estadoJuego:"Jugando" });
  })

  it('letra incorrecta pero juego terminado', function(){
    var juego1=new Juego([]);
    juego1.palabra="calavera";
    juego1.palabrahidden=["_", "_", "_", "_", "_", "_", "_", "_"];
    juego1.vidas=1;

    var result=juego1.gestionarLetra("g");
    expect(result).toEqual({estadoPal:"________", nVidas:0, estadoJuego:"Perdido" });
  })

  it('letra correcta y juego terminado', function(){
    var juego1=new Juego([]);
    juego1.palabra="calavera";
    juego1.palabrahidden=["_", "a", "l", "a", "v", "e", "r", "a"];
    juego1.vidas=6;

    var result=juego1.gestionarLetra("c");
    expect(result).toEqual({estadoPal:"calavera", nVidas:6, estadoJuego:"Ganado" });
  })

  it('letra correcta y juego no terminado', function(){
    var juego1=new Juego([]);
    juego1.palabra="calavera";
    juego1.palabrahidden=["_", "_", "_", "_", "_", "_", "_", "_"];
    juego1.vidas=6;

    var result=juego1.gestionarLetra("c");
    expect(result).toEqual({estadoPal:"c_______", nVidas:6, estadoJuego:"Jugando" });
  })

  it('no pasan letra', function(){
    var juego1=new Juego([]);
    juego1.palabra="calavera";
    juego1.palabrahidden=["_", "a", "l", "a", "v", "e", "r", "a"];
    juego1.vidas=6;

    var result=juego1.gestionarLetra("");
    expect(result).toEqual({estadoPal:"_alavera", nVidas:5, estadoJuego:"Jugando" });
  })
  

})