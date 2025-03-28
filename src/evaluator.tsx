import {AchievementData} from "@/types";

// achievements
export const hasAchievements = (data: AchievementData): boolean => {
    return data.achievementStats.total > 0;
};

export const hasNoAchievements = (data: AchievementData): boolean => {
    return data.achievementStats.total == 0;
};

export const hasAtLeastOneAchieved = (data: AchievementData): boolean => {
    return data.achievementStats.achieved > 0;
};

export const noProgress = (data: AchievementData): boolean => {
    return hasAchievements(data) && data.achievementStats.achieved == 0;
};

export const isCompleted = (data: AchievementData): boolean => {
    return hasAchievements(data) && data.achievementStats.achieved == data.achievementStats.total;
};

export const isInProgress = (data: AchievementData): boolean => {
    return hasAchievements(data) && data.achievementStats.achieved > 0 && (data.achievementStats.achieved < data.achievementStats.total);
};

// steam id approximation
export const isSteamId = (id: string) => {
    return id.length == 17 && /^[0-9]+$/.test(id);
}