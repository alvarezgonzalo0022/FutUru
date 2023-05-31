export const getOnlyPlayers = (data) => {
    let players = [];
    data.forEach(season => {
        season.forEach(team => {
           team.forEach(player => players.push(player));
        })
    })
    return players;
}
