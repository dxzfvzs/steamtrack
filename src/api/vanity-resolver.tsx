"use server"

interface SteamAPIResponse {
    response: {
        steamid?: string;
        success: number;
        message?: string;
    };
}

export const getUserIdFromVanity = async (vanity: string): Promise<{ ok: boolean, id?: string, message?: string }> => {
    const key = process.env.STEAM_KEY;

    const url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${key}&vanityurl=${vanity}`;
    try {
        const response = await fetch(url);
        const data: SteamAPIResponse = await response.json();

        if (data.response.success === 1) {
            return {ok: true, id: data.response.steamid};
        }
        return {ok: false, message: data.response.message};

    } catch (e) {
        return {ok: false, message: "Failed to fetch user id from Vanity"};
    }
}