"use client"

import "../user-stats.css";
import GenericStats from "@/components/user-stats/details/generic-stats";
import {Tabs} from "@/components/user-stats/user-stats";
import GameStats from "@/components/user-stats/details/games";
import {useUserGames} from "@/hooks/useUserGames";
import {useUserIdContext} from "@/hooks/userId";


export default function ExtendedStats({selectedCard}: { selectedCard: Tabs, }) {

    const {user} = useUserIdContext();
    const {userGames, achievementData} = useUserGames(user?.id);

    if (!user || !achievementData) return <></>;

    return (
        <>
            {selectedCard == Tabs.DEFAULT &&
                <GenericStats/>}
            {selectedCard == Tabs.ALL_GAMES &&
                <GameStats data={achievementData}/>}
            {selectedCard == Tabs.GAMES_WITH_ACHIEVEMENTS &&
                <GameStats data={achievementData.filter(game => game.game.has_community_visible_stats)}/>}
            {selectedCard == Tabs.GAMES_WITHOUT_ACHIEVEMENTS &&
                <GameStats data={achievementData.filter(game => !game.game.has_community_visible_stats)}/>}
            {selectedCard == Tabs.COMPLETED_GAMES &&
                <GameStats
                    data={achievementData.filter(game => game.achievements && game.achievements.length > 0 && game.achievements.every(a => a.achieved))}/>}
            {selectedCard == Tabs.NEVER_PLAYED_GAMES &&
                <GameStats data={achievementData.filter(game => game.game.playtime_forever === 0)}/>}
        </>
    )
}
