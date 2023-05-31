import './App.css'
import { allPlayersApertura, allPlayersClausura, allTeams, getOnlyPlayersApertura, getOnlyPlayersClausura } from './app2'


function App() {
  return (
    <>
      <div>
        <button onClick={() => allTeams()}>
          AllTeams
        </button>
        <button onClick={() => allPlayersApertura()}>
          AllPlayersApertura
        </button>
        <button onClick={() => filterAllPlayersApertura()}>
          FilterAllPlayersApertura
        </button>
        <button onClick={() => allPlayersClausura()}>
          AllPlayersClausura
        </button>
        <button onClick={() => getOnlyPlayersApertura()}>
          GetApertura
        </button>
        <button onClick={() => filterAllPlayersClausura()}>
          FilterAllPlayersClausura
        </button>
        <button onClick={() => getOnlyPlayersClausura()}>
          GetClausura
        </button>
        <button onClick={() => allPlayersApertura(0)}>
          Get All Players Apertura
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
