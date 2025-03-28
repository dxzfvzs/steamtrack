export interface Achievement {
    achieved: boolean,
    apiname: string,
}

export interface AchievementStats {
    total: number;
    achieved: number;
    progress: number;
    fullyLoaded: boolean;
}

export interface AchievementData {
    game: Game,
    achievementStats: AchievementStats,
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

export interface User {
    id: string,
    vanity?: string,
    username?: string,
    picture?: string,
}