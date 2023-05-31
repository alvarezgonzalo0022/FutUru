import axios from "axios";
import { Leagues } from "./data";
import { fetchTeamsByLeagueAndSeason } from "./utils/fetchTeamsByLeagueAndSeason";
import { fetchPlayersByTeamAndSeason } from "./utils/fetchPlayersByTeamAndSeason";
import { getOnlyPlayers } from "./utils/getOnlyPlayers";
import { normalizePlayers } from "./utils/normalizePlayers";

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
        allPlayers.push(playersByTeamAndSeason);
    }

    const allPlayersToReturn = allPlayers.map(player => {
        return normalizePlayers(player)
    });

    return allPlayersToReturn;
  
};

export const fetchPlayersApertura = async () => {
    const leagueToUse = Leagues.response.filter(league => league.league.id === 268);

    const allPlayers = await allPlayersApertura(leagueToUse[0]);
    const onlyPlayers = getOnlyPlayers(allPlayers);

    const blob = new Blob([JSON.stringify(onlyPlayers)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'allPlayersApertura.json';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export const allPlayersClausura = async (league) => {
    let season = league.seasons[0].year;
    let max_season = league.seasons[league.seasons.length - 1].year;
    let allPlayers = [];
  
    for (season; season <= max_season; season++) {
        const teams = await fetchTeamsByLeagueAndSeason(league.league.id, season);

        const playersByTeamAndSeason = await Promise.all(teams.response.map(async team => {
            const players = await fetchPlayersByTeamAndSeason(team.team.id, season);
            return players;
        }));
        allPlayers.push(playersByTeamAndSeason);
    }

    const allPlayersToReturn = allPlayers.map(player => {
        return normalizePlayers(player)
    });

    return allPlayersToReturn;
};


export const fetchPlayersClausura = async () => {
    const leagueToUse = Leagues.response.filter(league => league.league.id === 270);

    const allPlayers = await allPlayersApertura(leagueToUse[0]);
    const onlyPlayers = getOnlyPlayers(allPlayers);

    const blob = new Blob([JSON.stringify(onlyPlayers)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'allPlayersClausura.json';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
  

export const allTeams = async () => {
  const leaguesToUse = Leagues.response.filter(league => league.league.id === 268 || league.league.id === 270);

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

  return allTeams;
};
