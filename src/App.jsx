import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { allPlayers, allTeams } from './app2'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <button onClick={() => allTeams()}>
          AllTeams 
        </button>
        <button onClick={() => allPlayers()}>
          AllPlayers 
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
