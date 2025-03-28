"use client"

import "./user-stats.css";
import {useUserIdContext} from "@/hooks/userId";
import {useEffect, useState} from "react";
import ExtendedStats from "@/components/user-stats/details/extended-stats-caller";
import ClickableStatCard from "@/components/user-stats/statcards/clickableStatCard";
import {useUserGames} from "@/hooks/useUserGames";
import {hasAchievements, hasAtLeastOneAchieved, isCompleted, isInProgress, noProgress} from "@/evaluator";

export enum Tabs {
    DEFAULT,
    ALL_GAMES,
    GAMES_WITH_ACHIEVEMENTS,
    GAMES_WITHOUT_ACHIEVEMENTS,
    COUNTS_TOWARD_GLOBAL,
    NO_PROGRESS,
    IN_PROGRESS,
    COMPLETED_GAMES,
    ACHIEVEMENTS,
}

export default function UserStatsOverview() {
    const [selectedCard, setSelectedCard] = useState(Tabs.DEFAULT);
    const [progress, setProgress] = useState(0);
    const {user} = useUserIdContext();
    const {achievementData, loading, processed} = useUserGames();

    useEffect(() => {
        setSelectedCard(Tabs.DEFAULT);
    }, [user]);

    useEffect(() => {
        if (loading) {
            return;
        }

        let validGames = 0;
        let total = 0;
        achievementData.forEach((game) => {
            if (game.achievementStats.achieved > 0) {
                validGames++;
                total += game.achievementStats.progress;
            }
        })

        setProgress(Math.round(validGames > 0 ? total / validGames : 0));
    }, [achievementData, loading]);

    if (!user || !achievementData) return <></>;
    const {id, vanity, username} = user;

    return (
        <>
            {loading && processed && <div className="loading-bar">Loading progress: {processed.progress} / {processed.total}</div>}

            <div className="stat-summary-container">
                <div
                    className={`statbox statbox-static ${progress <= 35 ? "progress-bad" : `${progress >= 70 ? "progress-good" : "progress-neutral"}`}`}
                >
                    {loading ? <div className="loading-spinner"></div> :
                        <span className="stat-summary--main-text">{progress}%</span>}
                </div>


                <ClickableStatCard cardType={Tabs.DEFAULT} cardUseState={{selectedCard, setSelectedCard}}
                                   hint={vanity || username ? "User: " : "SteamID: "}
                                   value={username ? username : (vanity ? vanity : id)}/>

                <ClickableStatCard hint="All found games: " cardType={Tabs.ALL_GAMES}
                                   cardUseState={{selectedCard, setSelectedCard}}
                                   value={achievementData.length}/>

                <ClickableStatCard hint="With achievements: " cardType={Tabs.GAMES_WITH_ACHIEVEMENTS}
                                   isLoading={loading}
                                   cardUseState={{selectedCard, setSelectedCard}}
                                   value={achievementData.filter(game => hasAchievements(game)).length}/>

                <ClickableStatCard hint="Counts towards global" cardType={Tabs.COUNTS_TOWARD_GLOBAL}
                                   isLoading={loading}
                                   cardUseState={{selectedCard, setSelectedCard}}
                                   value={achievementData.filter(game => hasAtLeastOneAchieved(game)).length}/>

                <ClickableStatCard hint="No progress: " cardType={Tabs.NO_PROGRESS} isLoading={loading}
                                   cardUseState={{selectedCard, setSelectedCard}}
                                   value={achievementData.filter(game => noProgress(game)).length}/>

                <ClickableStatCard hint="In Progress: " cardType={Tabs.IN_PROGRESS} isLoading={loading}
                                   cardUseState={{selectedCard, setSelectedCard}}
                                   value={achievementData.filter(game => isInProgress(game)).length}/>

                <ClickableStatCard hint="100%" cardType={Tabs.COMPLETED_GAMES} isLoading={loading}
                                   cardUseState={{selectedCard, setSelectedCard}}
                                   value={achievementData.filter(game => isCompleted(game)).length}/>

                <ClickableStatCard hint="Achievements: " cardType={Tabs.ACHIEVEMENTS} isLoading={loading}
                                   cardUseState={{selectedCard, setSelectedCard}}
                                   value={achievementData.reduce((acc, data) => acc + data.achievementStats.achieved, 0)}/>
            </div>

            <ExtendedStats selectedCard={selectedCard}/>
        </>

    )
}
