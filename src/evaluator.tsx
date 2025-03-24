import {AchievementData} from "@/hooks/useUserGames";

export const hasAchievements = (data: AchievementData): boolean => {
    return data.achievementStats.total > 0;
};

export const hasNoAchievements = (data: AchievementData): boolean => {
    return data.achievementStats.total == 0;
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