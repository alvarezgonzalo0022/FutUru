import axios from "axios";

export const fetchAllCountries = async () => {
    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/countries',
      headers: {
        'X-RapidAPI-Key': 'd368855438msh5786e5a0c06c6b3p1b0a6ejsn8429671e1607',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    };
    
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}