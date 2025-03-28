"use client"

import "../user-stats.css";
import ProfileStats from "@/components/user-stats/details/profile-stats";
import {Tabs} from "@/components/user-stats/user-stats-overview";
import GameStats from "@/components/user-stats/details/games";
import {useUserGames} from "@/hooks/useUserGames";
import {
    hasAchievements,
    hasAtLeastOneAchieved,
    hasNoAchievements,
    isCompleted,
    isInProgress,
    noProgress
} from "@/evaluator";

export default function ExtendedStats({selectedCard}: { selectedCard: Tabs, }) {
    const {achievementData} = useUserGames();

    return (
        <>
            {selectedCard == Tabs.DEFAULT &&
                <ProfileStats/>}

            {selectedCard == Tabs.ALL_GAMES &&
                <GameStats data={achievementData}/>}

            {selectedCard == Tabs.GAMES_WITH_ACHIEVEMENTS &&
                <GameStats data={achievementData.filter(game => hasAchievements(game))}/>}

            {selectedCard == Tabs.GAMES_WITHOUT_ACHIEVEMENTS &&
                <GameStats data={achievementData.filter(game => hasNoAchievements(game))}/>}

            {selectedCard == Tabs.COUNTS_TOWARD_GLOBAL &&
                <GameStats data={achievementData.filter(game => hasAtLeastOneAchieved(game))}/>}

            {selectedCard == Tabs.IN_PROGRESS &&
                <GameStats data={achievementData.filter(game => isInProgress(game))}/>}

            {selectedCard == Tabs.COMPLETED_GAMES &&
                <GameStats data={achievementData.filter(game => isCompleted(game))}/>}

            {selectedCard == Tabs.NO_PROGRESS &&
                <GameStats data={achievementData.filter(game => noProgress(game))}/>}

            {selectedCard == Tabs.ACHIEVEMENTS &&
                <ProfileStats/>}
        </>
    )
}
