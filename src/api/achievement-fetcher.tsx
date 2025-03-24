"use server"

import {Achievement, Game} from "@/api/all-games-fetcher";

interface SteamAPIResponse {
    success: boolean;
    playerstats: {
        achievements: Achievement[];
    };
}

export const getAchievementOfGame = async (id: string, appid: number): Promise<Achievement[]> => {

    const useWhitelist = false;
    if (useWhitelist) {
        const whitelist = [113200, 105600, 2667970];
        if (!whitelist.includes(appid)) {
            return [];
        }
    }

    const key = process.env.STEAM_KEY;

    const url = `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appid}&key=${key}&steamid=${id}`;
    try {
        const response = await fetch(url);
        const data: SteamAPIResponse = await response.json();

        if (!data.playerstats || !data.playerstats.achievements) {
            return [];
        }
        return data.playerstats.achievements;

    } catch (e) {
        return [];
    }
}
