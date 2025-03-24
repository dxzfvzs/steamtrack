"use client"

import "../user-stats.css";
import GenericStats from "@/components/user-stats/details/generic-stats";
import {Tabs} from "@/components/user-stats/user-stats-overview";
import GameStats from "@/components/user-stats/details/games";
import {useUserGames} from "@/hooks/useUserGames";
import {useUserIdContext} from "@/hooks/userId";
import {isCompleted, hasAchievements, hasNoAchievements, isInProgress, noProgress} from "@/evaluator";

export default function ExtendedStats({selectedCard}: { selectedCard: Tabs, }) {

    const {user} = useUserIdContext();
    const {userGames, achievementData} = useUserGames(user?.id);

    return (
        <>
            {selectedCard == Tabs.DEFAULT &&
                <GenericStats/>}

            {selectedCard == Tabs.ALL_GAMES &&
                <GameStats data={achievementData}/>}

            {selectedCard == Tabs.GAMES_WITH_ACHIEVEMENTS &&
                <GameStats data={achievementData.filter(game => hasAchievements(game))}/>}

            {selectedCard == Tabs.GAMES_WITHOUT_ACHIEVEMENTS &&
                <GameStats data={achievementData.filter(game => hasNoAchievements(game))}/>}

            {selectedCard == Tabs.IN_PROGRESS &&
                <GameStats data={achievementData.filter(game => isInProgress(game))}/>}

            {selectedCard == Tabs.COMPLETED_GAMES &&
                <GameStats data={achievementData.filter(game => isCompleted(game))}/>}

            {selectedCard == Tabs.NO_PROGRESS &&
                <GameStats data={achievementData.filter(game => noProgress(game))}/>}

            {selectedCard == Tabs.ACHIEVEMENTS &&
                <GenericStats/>}
        </>
    )
}
