export const normalizePlayers = (data) => {
    const players = data.map(response => {
        const responses = response.response.map(player => {
            return {
                name: player.player.name,
                fecha_nac: player.player.birth.date,
                team: player.statistics[0].team.name,
                position: player.statistics[0].games.position,
                playerImg: player.player.photo,
                nationality: player.player.nationality,
            }
        })
        return responses;
    });
    return players;
}