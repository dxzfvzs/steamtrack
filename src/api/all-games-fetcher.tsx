"use server"

import {Game} from "@/types";

interface SteamAPIResponse {
    response: {
        games: {
            appid: number;
            name: string;
            playtime_2weeks: number;
            playtime_forever: number;
            img_logo_url: string;
            img_icon_url: string;
            has_community_visible_stats: boolean;
        }[];
    };
}

export const getAllOwnedGames = async (id: string): Promise<{ games: Game[] }> => {
    const key = process.env.STEAM_KEY;
    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${id}&format=json&include_appinfo=true&include_played_free_games=true`;

    try {
        const response = await fetch(url);
        const data: SteamAPIResponse = await response.json();

        return {games: data.response.games || []};

    } catch (e) {
        console.error(e);
        return {games: []};
    }
}
