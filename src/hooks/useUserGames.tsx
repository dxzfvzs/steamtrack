import {useEffect, useState} from "react";
import {getAllOwnedGames} from "@/api/all-games-fetcher";
import {getAchievementOfGame} from "@/api/achievement-fetcher";
import {AchievementData, AchievementStats, Game} from "@/types";

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
                return {
                    game: game,
                    achievementStats: {
                        total: 0,
                        achieved: 0,
                        progress: 0,
                        fullyLoaded: !game.has_community_visible_stats
                    },
                }
            }));
        };

        void fetchUserGames();
    }, [userId]);

    useEffect(() => {
        if (!userId) {
            return;
        }

        setLoading(true);
        const fetchAchievements = async () => {
            const gamesWithStats = userGames.filter((game) => game.has_community_visible_stats);

            for (const game of gamesWithStats) {
                const achievements = await getAchievementOfGame(userId, game.appid);

                const total = achievements.length;
                const achieved = achievements.filter(a => a.achieved).length;
                const progress = achieved > 0 ? (achieved / total) * 100 : 0;
                const achievementStats: AchievementStats = {total, achieved, progress, fullyLoaded: true};

                setAchievementData((prevData) =>
                    prevData.map((item) =>
                        item.game.appid === game.appid ? {achievementStats, game: item.game} : item
                    )
                );
            }

            setLoading(false);
        };

        void fetchAchievements();
    }, [userGames, userId]);


    return {userGames, achievementData, loading};
}
