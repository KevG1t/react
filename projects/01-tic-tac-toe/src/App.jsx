import { useState } from 'react'
import confetti from 'canvas-confetti'

import { TURNS } from './constants'
import { Square } from './components/Square.jsx'
import { checkWinner, checkEndGame } from './logic/checks.js'
import { WinnerModal } from './components/WinnerModal'
import { saveGameToStorage, resetGameStorage } from './logic/storage/saveGame'

import './App.css'

function App () {
  const [board, setBoard] = useState(
    () => {
      const boardFromStorage = window.localStorage.getItem('board')

      if (boardFromStorage) return JSON.parse(boardFromStorage)

      return Array(9).fill(null)
    }
  )

  const [turn, setTurn] = useState(() => {
    const turnForStorage = window.localStorage.getItem('turn')
    return turnForStorage ?? TURNS.X 
  }) 

  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  function updateBoard (index) {
    if (board[index]) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

     // guardar aqui partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
    
  }

  return (

      <main className='board'>
        <h1>Tic tac toe</h1>
        <button onClick={resetGame}>Reset del juego</button>
        <section className='game'>
          {
            board.map((square, index) => {
              return (
                <Square
                  key={index}
                  updateBoard={updateBoard}
                  index={index}
                >
                  {square}
                </Square>
              )
            })
          }
        </section>

        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>

        <WinnerModal resetGame={resetGame} winner={winner} />
      </main>
  )
}

export default App
