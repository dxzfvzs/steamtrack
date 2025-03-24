"use client"

import "./user-stats.css";
import {useUserIdContext} from "@/hooks/userId";
import {useEffect, useState} from "react";
import ExtendedStats from "@/components/user-stats/details/extended-stats";
import ClickableStatCard from "@/components/user-stats/statcards/clickableStatCard";
import {useUserGames} from "@/hooks/useUserGames";

export enum Tabs {
    DEFAULT,
    ALL_GAMES,
    GAMES_WITH_ACHIEVEMENTS,
    GAMES_WITHOUT_ACHIEVEMENTS,
    NEVER_PLAYED_GAMES,
    COMPLETED_GAMES,
    ACHIEVEMENTS,
}

export default function UserStatsOverview() {
    const [selectedCard, setSelectedCard] = useState(Tabs.DEFAULT);
    const [progress, setProgress] = useState(0);
    const {user} = useUserIdContext();
    const {achievementData, loading} = useUserGames(user?.id);

    useEffect(() => {
        if (loading) {
            return;
        }

        let validGames = 0;
        let total = 0;
        achievementData.forEach((game) => {
            if (game.achievementStats.total > 0) {
                validGames++;
                total += game.achievementStats.progress;
            }
        })

        setProgress(Math.round(validGames > 0 ? validGames / total : 0));

    }, [achievementData, loading]);

    if (!user || !achievementData) return <></>;
    const {id, vanity, username, picture} = user;

    return (
        <>
            <div className="stat-summary-container">

                <div
                    className={`statbox statbox-static ${progress <= 30 ? "progress-bad" : `${progress >= 70 ? "progress-good" : "progress-neutral"}`}`}
                >
                    {loading ? <div className="loading-spinner"></div> :
                        <span className="stat-summary--main-text">{progress}%</span>}
                </div>


                <ClickableStatCard cardType={Tabs.DEFAULT} cardUseState={{selectedCard, setSelectedCard}}
                                   hint={vanity || username ? "User: " : "SteamID: "}
                                   value={username ? username : (vanity ? vanity : id)}/>

                <ClickableStatCard hint="All games: " cardType={Tabs.ALL_GAMES}
                                   cardUseState={{selectedCard, setSelectedCard}}
                                   value={achievementData.length}/>
                <ClickableStatCard hint="Has no achievements: " cardType={Tabs.GAMES_WITHOUT_ACHIEVEMENTS}
                                   cardUseState={{selectedCard, setSelectedCard}}
                                   value={achievementData.filter(game => !game.game.has_community_visible_stats).length}/>
                <ClickableStatCard hint="Has achievements: " cardType={Tabs.GAMES_WITH_ACHIEVEMENTS}
                                   cardUseState={{selectedCard, setSelectedCard}}
                                   value={achievementData.filter(game => game.game.has_community_visible_stats).length}/>
                <ClickableStatCard hint="Never played: " cardType={Tabs.NEVER_PLAYED_GAMES}
                                   cardUseState={{selectedCard, setSelectedCard}}
                                   value={achievementData.filter(game => game.game.playtime_forever === 0).length}/>
                <ClickableStatCard hint="Completed games: " cardType={Tabs.COMPLETED_GAMES} isLoading={loading}
                                   cardUseState={{selectedCard, setSelectedCard}}
                                   value={achievementData.filter(game => game.achievements && game.achievements.length > 0 && game.achievements.every(a => a.achieved)).length}/>
                <ClickableStatCard hint="Achievements: " cardType={Tabs.ACHIEVEMENTS} isLoading={loading}
                                   cardUseState={{selectedCard, setSelectedCard}}
                                   value={achievementData.reduce((acc, data) => acc + data.achievementStats.achieved, 0)}/>

            </div>
            <ExtendedStats selectedCard={selectedCard}/>
        </>

    )
}
