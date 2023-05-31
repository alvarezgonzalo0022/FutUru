import { RapidAPIKey, RapidAPIHost } from '../../env.js';
import axios from 'axios';

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
