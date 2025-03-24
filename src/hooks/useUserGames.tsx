import {useEffect, useState} from "react";
import {Achievement, Game, getAllOwnedGames} from "@/api/all-games-fetcher";
import {getAchievementOfGame} from "@/api/achievement-fetcher";

export interface AchievementData {
    game: Game,
    achievements: Achievement[] | undefined
}

export function useUserGames(userId?: string) {
    const [userGames, setUserGames] = useState<Game[]>([]);
    const [achievementData, setAchievementData] = useState<AchievementData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!userId) {
            setUserGames([]);
            return;
        }

        const fetchUserGames = async () => {
            const data = await getAllOwnedGames(userId);
            setUserGames(data.games);
            setAchievementData(data.games.map(game => {
                return {game: game, achievements: game.has_community_visible_stats ? undefined : []}
            }));
        };

        void fetchUserGames();
    }, [userId]);

    useEffect(() => {
        setLoading(true);
        const fetchAchievements = async () => {
            const achievements = await Promise.all(
                userGames.map(async (game: Game) => {
                    if (!game.has_community_visible_stats) {
                        return {game, achievements: []};
                    }
                    const achievementData = await getAchievementOfGame(userId!, game.appid);
                    return {game, achievements: achievementData};
                })
            );
            setAchievementData(achievements);
            setLoading(false);
        };

        void fetchAchievements();
    }, [userGames, userId]);


    return {userGames, achievementData, loading};
}
