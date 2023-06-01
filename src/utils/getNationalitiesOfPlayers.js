import { Nationalities } from "../data";
import { saveToJson } from "./saveToJson";

export const getNationalitiesOfPlayers = async (data, league) => {
    const allNationalities = Nationalities;

    let nationalitiesOnTeams = [];
    data.forEach(season => {
        season.forEach(team => {
            team.forEach(player => nationalitiesOnTeams.push(player.nationality))
        })
    });
    const dataArr = new Set(nationalitiesOnTeams);
    const filteredNationalities = [...dataArr];
    const nationalitiesObjects = [];

    for(let i = 0; i < filteredNationalities.length; i++) {
        for(let y = 0; y < allNationalities.length; y++) {
            if(filteredNationalities[i] === allNationalities[y].name) {
                nationalitiesObjects.push(allNationalities[y]);
            }
        }
    }

    saveToJson(nationalitiesObjects, `nationalities${league}`);

    return nationalitiesObjects;
}