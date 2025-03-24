"use server"

export interface Achievement {
    achieved: boolean,
    apiname: string,
}

interface SteamAPIResponse {
    response: {
        game_count: number;
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

export interface Game {
    appid: number;
    name: string;
    playtime_2weeks: number;
    playtime_forever: number;
    img_logo_url: string;
    img_icon_url: string;
    has_community_visible_stats: boolean;
}

export const getAllOwnedGames = async (id: string): Promise<{ game_count: number, games: Game[] }> => {
    const key = process.env.STEAM_KEY;

    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${id}&format=json&include_appinfo=true&include_played_free_games=true`;
    try {
        const response = await fetch(url);
        const data: SteamAPIResponse = await response.json();

        if (data.response) {
            return {
                game_count: data.response.game_count, games: data.response.games.map(game => {
                    if (!game.has_community_visible_stats) {
                        return {...game, total_achievements: []};
                    } else {
                        return game;
                    }
                })
            };
        }

        return {game_count: 0, games: []};

    } catch (e) {
        return {game_count: 0, games: []};
    }
}
