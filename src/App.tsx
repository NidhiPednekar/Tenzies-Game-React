import { nanoid } from 'nanoid';
import './App.css'
import Die from "./Die.jsx";
import {useState} from "react";

function App() {
  const [dice, setDice] = useState(generateAllNewDice())

  function generateAllNewDice(){
   return new Array(10)
   .fill(0)
   .map(() => ({
    value: Math.ceil(Math.random() * 6),
    isHeld: false,
    id:nanoid()
   }))
  }
  
  const diceElements = dice.map(dieObj =>(
  <Die 
  key={dieObj.id}
  value={dieObj.value} 
  isHeld={dieObj.isHeld}
  hold={() => hold(dieObj.id)}
  />
) )

  function rollDice(){
    setDice(oldDice => oldDice.map(die =>
      die.isHeld ?
        die :
        {...die,value: Math.ceil(Math.random() * 6)}

    ))
  }

  function hold(id){
    setDice(oldDice => oldDice.map(die =>
         die.id === id ?
        {...die, isHeld: !die.isHeld}:
        die
        )
    )
  }

  return (
    <>
      <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
       {diceElements}
      </div>

      <button className="roll-dice" onClick={rollDice}>Roll</button>
      </main>
    </>
  )
}

export default App
