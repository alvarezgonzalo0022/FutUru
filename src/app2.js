import { Leagues } from "./data";
import { fetchTeamsByLeagueAndSeason } from "./utils/fetch/fetchTeamsByLeagueAndSeason";
import { fetchPlayersByTeamAndSeason } from "./utils/fetch/fetchPlayersByTeamAndSeason";
import { getOnlyPlayers } from "./utils/getOnlyPlayers";
import { normalizePlayers } from "./utils/normalizePlayers";
import { getNationalitiesOfPlayers } from "./utils/getNationalitiesOfPlayers";
import { saveToJson } from "./utils/saveToJson";

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
    getNationalitiesOfPlayers(allPlayers, 'Apertura');

    saveToJson(onlyPlayers, 'allPlayersApertura');
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
    getNationalitiesOfPlayers(allPlayers, 'Clausura');

    saveToJson(onlyPlayers, 'allPlayersClausura');
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

  saveToJson(allTeams, 'allTeams');

  return allTeams;
};
