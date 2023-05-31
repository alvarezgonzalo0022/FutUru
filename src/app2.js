import axios from "axios";
import { Leagues } from "./data";
import { RapidAPIHost, RapidAPIKey } from "../env";

export const fetchTeamsByLeagueAndSeason = async (leagueID, season) => {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
        params: {
            league: leagueID,
            season: season
        },
        headers: {
            'X-RapidAPI-Key': RapidAPIKey,
            'X-RapidAPI-Host': RapidAPIHost
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const fetchPlayersByTeamAndSeason = async (teamID, season) => {    
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/players',
        params: {
            team: teamID,
            season: season
        },
        headers: {
            'X-RapidAPI-Key': RapidAPIKey,
            'X-RapidAPI-Host': RapidAPIHost
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export const normalizePlayers = (data) => {

    const players = data.map(response => {
        const responses = response.response.map(player => {
            return {
                name: player.player.name,
                fecha_nac: player.player.birth.date,
                team: player.statistics[0].team.name,
                position: player.statistics[0].games.position,
                playerImg: player.player.photo,
            }
        })
        return responses;
    });
    return players;
}

export const allPlayersApertura = async (league) => {
    let season = league.seasons[0].year;
    let max_season = league.seasons[league.seasons.length - 1].year;
    let allPlayers = [];
  
    for (season; season <= max_season; season++) {
        const teams = await fetchTeamsByLeagueAndSeason(league.league.id, season);

        const playersByTeamAndSeason = await Promise.all(teams.response.map(async team => {
            const players = await fetchPlayersByTeamAndSeason(team.team.id, season);
            return players;
        }));
        console.log(playersByTeamAndSeason);
        allPlayers.push(playersByTeamAndSeason);
    }

    const allPlayersToReturn = allPlayers.map(player => {
        return normalizePlayers(player)
    });

    return allPlayersToReturn;
  
};

export const getOnlyPlayersApertura = (data) => {
    let players = [];
    data.forEach(season => {
        season.forEach(team => {
           team.forEach(player => players.push(player));
        })
    })
    return players;
}

export const fetchPlayersApertura = async () => {
    const leagueToUse = Leagues.response.filter(league => league.league.id === 268);

    const allPlayers = await allPlayersApertura(leagueToUse[0]);
    const getOnlyPlayers = getOnlyPlayersApertura(allPlayers);

    const blob = new Blob([JSON.stringify(getOnlyPlayers)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'allPlayersApertura.json';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('allTeams saved to file.');
}

export const allPlayersClausura = async () => {
    const leaguesToUse = Leagues.response.filter(league => league.league.id === 268 || league.league.id === 270);
  
    let league = 1;
    let season = leaguesToUse[league].seasons[0].year;
    let max_season = leaguesToUse[league].seasons[leaguesToUse[league].seasons.length - 1].year;
    let allPlayers = [];
  
    for (season; season <= max_season; season++) {
        const teams = await fetchTeamsByLeagueAndSeason(leaguesToUse[league].league.id, season);

        const playersByTeamAndSeason = await Promise.all(teams.response.map(async team => {
            const players = await fetchPlayersByTeamAndSeason(team.team.id, season);
            return players;
        }));
        console.log(playersByTeamAndSeason);
        allPlayers.push(playersByTeamAndSeason);
    }
  
    console.log(allPlayers);
  
    // Save allPlayers to a file
    const blob = new Blob([JSON.stringify(allPlayers)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = 'allPlayersClausura.json';
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    console.log('allPlayers saved to file.');
};

export const filterAllPlayersClausura = () => {
    const players = allPlayersClausura2.map(player => {
        return filterPlayers(player)
    });

    // Save allPlayers to a file
    const blob = new Blob([JSON.stringify(players)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'allFilteredPlayersClausura.json';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('allPlayers saved to file.');

};

export const getOnlyPlayersClausura = () => {
    let players = [];
    arrayClausuraToNormalize.forEach(season => {
        season.forEach(team => {
           team.forEach(player => players.push(player));
        })
    })

      // Save allTeams to a file
    const blob = new Blob([JSON.stringify(players)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'allPlayersClausura.json';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('allTeams saved to file.');
};
  

export const allTeams = async () => {
  const leaguesToUse = Leagues.response.filter(
    league => league.league.id === 268 || league.league.id === 270
  );

  let league = 0;
  let season = leaguesToUse[league].seasons[0].year;
  let max_season = leaguesToUse[league].seasons[leaguesToUse[league].seasons.length - 1].year;
  let allTeams = [];

  for (league; league < 2; league++) {
    season = leaguesToUse[league].seasons[0].year;
    max_season = leaguesToUse[league].seasons[leaguesToUse[league].seasons.length - 1].year;

    for (season; season <= max_season; season++) {
      const teams = await fetchTeamsByLeagueAndSeason(leaguesToUse[league].league.id, season);

      teams.response.forEach(team => {
        allTeams.push({
          name: team.team.name,
          code: team.team.code || 'No tiene',
          logo: team.team.logo,
          founded: team.team.founded,
          city: team.venue.city,
          stadium: team.venue.name,
        });
      });
    }
  }

  // Save allTeams to a file
  const blob = new Blob([JSON.stringify(allTeams)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'allTeams.json';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  console.log('allTeams saved to file.');

  return allTeams;
};
