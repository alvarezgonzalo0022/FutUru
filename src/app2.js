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
            'X-RapidAPI-Key': process.env.X-RapidAPI-Key,
            'X-RapidAPI-Host': process.env.X-RapidAPI-Host
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const fetchPlayersByTeam = async (teamID, season) => {
    
        const options = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/players',
            params: {
                team: teamID,
                season: season
            },
            headers: {
                'X-RapidAPI-Key': process.env.X-RapidAPI-Key,
                'X-RapidAPI-Host': process.env.X-RapidAPI-Host
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
    })  
    return players;
}

export const AllPlayers = async () => {

    const leagues = Leagues;
    const leaguesToUse = leagues.response.filter(league => league.league.id === 268 || league.league.id === 270);

    const teams = await fetchTeamsByLeagueAndSeason(leaguesToUse[0].league.id, 2012);

    const players = teams.response.map(async team => {
        console.log(team.team.id);
        const playersBySquad = await fetchPlayersByTeam(team.team.id, 2012);
        return playersBySquad;
    })

    console.log(players);

    return filterPlayers(players);

}

export const AllTeams = async () => {
    const leagues = Leagues;
    const leaguesToUse = leagues.response.filter(league => league.league.id === 268 || league.league.id === 270);

    
    const teams = fetchTeamsByLeagueAndSeason(leaguesToUse[0].league.id, 2012);

    return teams.map(team => {
        return {
            name: team.team.name,
            code: team.team.code,
            logo: team.team.logo,
            founded: team.team.founded,
            city: team.venue.city,
            stadium: team.venue.name,
        }
    })
}