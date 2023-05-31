export const getNationalitiesOfPlayers = (data, league) => {
    let nationalities = [];
    data.forEach(season => {
        season.forEach(team => {
            team.forEach(player => nationalities.push(player.nationality))
        })
    });

    const dataArr = new Set(nationalities);
    const filteredNationalities = [...dataArr];

    const blob = new Blob([JSON.stringify(filteredNationalities)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `nationalities${league}.json`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return nationalities;
}