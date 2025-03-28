"use server"

interface SteamApiExtraUserInfoResponse {
    response: {
        players: {
            personaname: string;
            avatarfull: string
        }[]
    };
}

export const getExtraUserInfo = async (id: string): Promise<{ username?: string, picture?: string }> => {
    if (!id) return {};

    const key = process.env.STEAM_KEY;
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${id}`;

    const response = await fetch(url);
    const data: SteamApiExtraUserInfoResponse = await response.json();
    const player = data.response.players[0];
    return {username: player.personaname, picture: player.avatarfull};
}
