import {useEffect, useState} from "react";
import {getAllUserGames} from "@/api/all-games-fetcher";
import {getAchievementOfGame} from "@/api/achievement-fetcher";
import {AchievementData, AchievementStats, Game} from "@/types";
import {useUserIdContext} from "@/hooks/userId";

export function useUserGames() {
    const [userGames, setUserGames] = useState<Game[]>([]);
    const [achievementData, setAchievementData] = useState<AchievementData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [processed, setProcessed] = useState<{ progress: number, total: number } | null>(null);
    const {user} = useUserIdContext();

    useEffect(() => {
        if (!user) {
            setUserGames([]);
            return;
        }

        const fetchUserGames = async () => {
            const data = await getAllUserGames(user.id);
            setUserGames(data.games);
            setAchievementData(data.games.map(game => {
                return {
                    game: game,
                    achievementStats: {
                        total: 0,
                        achieved: 0,
                        progress: 0,
                        fullyLoaded: !game.has_community_visible_stats,
                    },
                    achievements: [],
                }
            }));
        };

        void fetchUserGames();
    }, [user]);

    useEffect(() => {
        if (!user) {
            return;
        }

        const fetchAchievements = async () => {
            setLoading(true);
            const gamesWithStats = userGames.filter((game) => game.has_community_visible_stats);
            const gamesWithStatsCount = gamesWithStats.length;

            for (const game of gamesWithStats) {
                setProcessed(prevState => prevState
                    ? {progress: prevState.progress + 1, total: gamesWithStatsCount}
                    : {progress: 1, total: gamesWithStatsCount});

                const achievements = await getAchievementOfGame(user.id, game.appid);

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
            setProcessed(null);
            setLoading(false);
        };

        void fetchAchievements();
    }, [userGames, user]);

    return {userGames, setUserGames, achievementData, loading, processed};
}
