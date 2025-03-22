"use client"

import "./user-stats.css";
import GenericStats from "@/components/user-stats/details/generic-stats";
import {Tabs} from "@/components/user-stats/user-stats";
import GameStats from "@/components/user-stats/details/games";
import {useUserGames} from "@/hooks/useUserGames";
import {useUserIdContext} from "@/hooks/userId";


export default function ExtendedStats({selectedCard}: { selectedCard: Tabs, }) {
    const {user: {id, vanity}} = useUserIdContext();
    const {data, isLoading} = useUserGames(id);

    return (
        <>
            {selectedCard == Tabs.DEFAULT && <GenericStats/>}
            {selectedCard == Tabs.ALL_GAMES && <GameStats data={data?.games.allGames ?? []}/>}
            {selectedCard == Tabs.GAMES_WITH_ACHIEVEMENTS && <GameStats data={data?.games.gamesWithAchievements ?? []}/>}
            {selectedCard == Tabs.GAMES_WITHOUT_ACHIEVEMENTS && <GameStats data={data?.games.gamesWithoutAchievements ?? []}/>}
            {selectedCard == Tabs.COMPLETED_GAMES && <GameStats data={data?.games.completedGames ?? []}/>}
            {selectedCard == Tabs.NEVER_PLAYED_GAMES && <GameStats data={data?.games.neverPlayedGames ?? []}/>}
        </>
    )
}
