import { useState } from 'react'
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({ children, isSelected, updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''} `
  
  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function App() {

  const [board, setBoard] = useState(
    Array(9).fill(null)
  )

  const [turn, setTurn] = useState(TURNS.X)

  const checkWinner = (boardToCheck) => {

    // Revisar todas las posiciones ganadoras para ver si X u O ganó
    for(const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if(boardToCheck[a] && 
         boardToCheck[a] === boardToCheck[b] &&
         boardToCheck[b] === boardToCheck[c]
      ) {
          return boardToCheck[a]
      }
    }
    return null
  }

  // null = No hay ganador, false = Hay empate, true = ganador
  const [winner, setWinner] = useState(null)


  const updateBoard = (index) => {

    // Si ya tiene algo! No actualizamos la posición.
    if(board[index] || winner) return 

    // Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn // 'x' u 'o'
    setBoard(newBoard)

    // Cada vez que se hace un click en un cuadro se cambia de Turno
    const newturn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newturn)

    // Revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner) {
      alert(`El ganador es: ${newWinner}`)
      setWinner(newWinner)
    }
  }

  return (
    <main className='board'>
        <h1>Ta-Te-Ti</h1>
        <section className='game'>
          { //Renderizar cada uno de los Square en el tablero
            board.map((_, index) => {
              return (
                <Square key={index} index={index} updateBoard={updateBoard}>
                    {board[index]}
                </Square>
              )
            })
          }
        </section>

        <section className='turn'>
            <Square isSelected={turn === TURNS.X}>
              {TURNS.X}
            </Square>
            <Square isSelected={turn === TURNS.O}>
              {TURNS.O}
            </Square>
        </section>
    </main>
  )
}

export default App