"use server"

interface SteamApiIdResponse {
    response: {
        steamid?: string;
        success: number;
        message?: string;
    };
}

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
    return {username: data.response.players[0].personaname, picture: data.response.players[0].avatarfull};
}

export const getUserIdFromVanity = async (vanity: string): Promise<{ ok: boolean, id?: string, message?: string }> => {
    const key = process.env.STEAM_KEY;
    const url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${key}&vanityurl=${vanity}`;

    try {
        const response = await fetch(url);
        const data: SteamApiIdResponse = await response.json();

        if (data.response.success === 1) {
            return {ok: true, id: data.response.steamid};
        }
        return {ok: false, message: data.response.message + " (resolving id from vanity)"};

    } catch (e) {
        return {ok: false, message: "Failed to fetch user id from Vanity"};
    }
}