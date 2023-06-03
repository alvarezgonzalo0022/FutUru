export const normalizePlayers = (data) => {
    const players = data.map(response => {
        const responses = response.response.map(player => {
            return {
                firstName: player.player.firstname,
                lastName: player.player.lastname,
                fullName: `${player.player.firstname} ${player.player.lastname}`,
                abbreviated_name: player.player.name,
                birth_date: player.player.birth.date,
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