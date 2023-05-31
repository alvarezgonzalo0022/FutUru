import './App.css'
import { allTeams, fetchPlayersApertura, fetchPlayersClausura } from './app2'
import { fetchAllCountries } from './utils/fetch/fetchAllCountries'
import { getNationalitiesOfPlayers } from './utils/getNationalitiesOfPlayers'


function App() {
  return (
    <>
      <div>
        <button onClick={() => allTeams()}>
          AllTeams
        </button>
        <button onClick={() => fetchPlayersApertura()}>
          Get All Players Apertura
        </button>
        <button onClick={() => fetchPlayersClausura()}>
          Get All Players Clausura
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
