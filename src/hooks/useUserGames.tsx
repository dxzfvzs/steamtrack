import { useQuery } from "@tanstack/react-query";
import { getAllOwnedGames } from "@/api/all-games-fetcher";

export function useUserGames(userId: string) {
    return useQuery({
        queryKey: ["userGames", userId],
        queryFn: async () => {
            const data = await getAllOwnedGames(userId);

            const categorizedGames = {
                allGames: data.games,
                gamesWithAchievements: data.games.filter(game => game.has_community_visible_stats),
                gamesWithoutAchievements: data.games.filter(game => !game.has_community_visible_stats),
                neverPlayedGames: data.games.filter(game => game.playtime_forever === 0),
                completedGames: data.games,
            };

            return {
                games: categorizedGames,
                counts: {
                    allGames: data.game_count,
                    gamesWithAchievements: categorizedGames.gamesWithAchievements.length,
                    gamesWithoutAchievements: categorizedGames.gamesWithoutAchievements.length,
                    neverPlayedGames: categorizedGames.neverPlayedGames.length,
                    completedGames: categorizedGames.completedGames.length,
                }
            };
        },
        staleTime: 1000 * 60 * 5,
    });
}
