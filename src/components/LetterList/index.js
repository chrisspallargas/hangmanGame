import React from 'react'
import Letter from '../Letter'

const LetterList = ({letras, onSaid}) => (
    <ul class="lista">
        {
            letras.map((letra, i) => 
            <Letter key={letra+i} nombre={letra.letter} said={letra.said} onSaid={onSaid}></Letter>)
        }
   </ul>)


export default LetterList