import axios from "axios";
import { Leagues } from "./data";

export const fetchTeamsByLeagueAndSeason = async (leagueID, season) => {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
        params: {
            league: leagueID,
            season: season
        },
        headers: {
            'X-RapidAPI-Key': process.env.RapidAPIKey,
            'X-RapidAPI-Host': process.env.RapidAPIHost
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
            'X-RapidAPI-Key': process.env.RapidAPIKey,
            'X-RapidAPI-Host': process.env.RapidAPIHost
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export const filterPlayers = (data) => {
    const players = data.map(player => {
        return {
            name: player.player.name,
            fecha_nac: player.player.birth.date,
            team: player.statistics[0].team.name,
            position: player.statistics[0].games.position,
            playerImg: player.player.photo,
        }
    });
    return players;
}

export const allPlayers = async () => {

    // crear variable para aumentar la liga a 270 cuando termine el apertura y otra variable para subir la season, arrancando desde 2012 hasta 2022
    let league = 0;
    let season = 2012;

    const leaguesToUse = Leagues.response.filter(league => league.league.id === 268 || league.league.id === 270);

    const teams = await fetchTeamsByLeagueAndSeason(leaguesToUse[0].league.id, 2012);

    const players = teams.response.map(async team => {
        console.log(team.team.id);
        const playersBySquad = await fetchPlayersByTeamAndSeason(team.team.id, 2012);
        return playersBySquad;
    });

    const filteredPlayers = filterPlayers(players);

    console.log(filteredPlayers);

}

export const allTeams = async () => {

    // crear variable para aumentar la liga a 270 cuando termine el apertura y otra variable para subir la season, arrancando desde 2012 hasta 2022
    let league = 0;
    let season = 2012;

    const leaguesToUse = Leagues.response.filter(league => league.league.id === 268 || league.league.id === 270);
    
    const teams = fetchTeamsByLeagueAndSeason(leaguesToUse[league].league.id, season);

    const allTeams = teams.map(team => {
        return {
            name: team.team.name,
            code: team.team.code,
            logo: team.team.logo,
            founded: team.team.founded,
            city: team.venue.city,
            stadium: team.venue.name,
        }
    });

    console.log(allTeams);
}