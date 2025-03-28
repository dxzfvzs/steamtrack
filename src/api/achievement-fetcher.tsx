"use server"

import {Achievement} from "@/types";

interface SteamAPIResponse {
    success: boolean;
    playerstats: {
        achievements: Achievement[];
    };
}

export const getAchievementOfGame = async (id: string, appid: number): Promise<Achievement[]> => {
    const key = process.env.STEAM_KEY;
    const url = `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appid}&key=${key}&steamid=${id}`;
    const urlLang = `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appid}&key=${key}&steamid=${id}&l=eng`;

    try {
        const response = await fetch(url);
        const data: SteamAPIResponse = await response.json();

        if (!data.playerstats || !data.playerstats.achievements) {
            return [];
        }
        return data.playerstats.achievements;

    } catch (e) {
        console.error(e);
        return [];
    }
}
