import React from 'react'


const Letter = ({nombre, said, onSaid}) => (
   
    <span>
    { said && <button type='button' className="letraDicha letra" disabled > {nombre} </button> }
    { !said && <button type='button' className="letraNoDicha letra" onClick={()=>onSaid(nombre)}>{nombre}</button>}
    </span>
);
    
    


export default Letter