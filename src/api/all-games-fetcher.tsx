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

export const getAllUserGames = async (id: string): Promise<{ games: Game[] }> => {
    const key = process.env.STEAM_KEY;
    const urlOwned = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${id}&format=json&include_appinfo=true&include_played_free_games=true`;
    const urlRecent = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${key}&steamid=${id}`;

    try {
        const responseOwned = await fetch(urlOwned);
        const dataOwned: SteamAPIResponse = await responseOwned.json();
        const ownedGames = dataOwned.response.games || [];

        const responseRecent = await fetch(urlRecent);
        const dataRecent: SteamAPIResponse = await responseRecent.json();
        const recentGames = dataRecent.response.games || [];

        const borrowedGames = recentGames
            .filter((game) =>
                ownedGames.every(gameo => gameo.appid !== game.appid)
            ).map(game => {
                return {...game, has_community_visible_stats: true}
            });

        return {
            games: ownedGames.concat(borrowedGames)
        };

    } catch (e) {
        console.error(e);
        return {games: []};
    }
}
