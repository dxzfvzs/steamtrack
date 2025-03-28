import {AchievementData} from "@/types";

export const ascendingDefaults = ["name"];

export interface TableGameData {
    appid: number,
    name: string,
    playtime2Week: number,
    playtimeForever: number,
    progress: number,
    achievedAchievements: number | undefined,
    totalAchievements: number | undefined,
}

export function castTableData(data: AchievementData[]): TableGameData[] {
    return data.map((aData) => {
        return {
            appid: aData.game.appid,
            name: aData.game.name,
            playtime2Week: aData.game.playtime_2weeks,
            playtimeForever: aData.game.playtime_forever,
            progress: aData.achievementStats.progress,
            achievedAchievements: aData.achievementStats.fullyLoaded ? aData.achievementStats.achieved : undefined,
            totalAchievements: aData.achievementStats.fullyLoaded ? aData.achievementStats.total : undefined,
        }
    })
}
