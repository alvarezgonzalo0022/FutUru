import { Nationalities } from "../data";

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

    const blob = new Blob([JSON.stringify(nationalitiesObjects)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `nationalities${league}.json`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return nationalitiesObjects;
}