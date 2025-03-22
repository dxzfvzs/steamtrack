"use client"

import "./user-stats.css";
import {useUserIdContext} from "@/hooks/userId";
import {useState} from "react";
import ExtendedStats from "@/components/user-stats/extended-stats";
import ClickableStatCard from "@/components/user-stats/clickable-stat-card";
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

export default function UserStats() {
    const [selectedCard, setSelectedCard] = useState(Tabs.DEFAULT);

    const {user} = useUserIdContext();
    const {data, isLoading} = useUserGames(user?.id);

    if (!user) {
        return <></>;
    }
    const {id, vanity, username, picture } = user;
    const progress = 90;


    if (isLoading) return <p>Loading games...</p>;

    return (
        <>
            <div className="stat-summary-container">
                <div
                    className={`statbox statbox-static ${progress <= 30 ? "progress-bad" : `${progress >= 70 ? "progress-good" : "progress-neutral"}`}`}>
                    <span className={`stat-summary--main-text`}>{progress}%</span>
                </div>

                <ClickableStatCard cardType={Tabs.DEFAULT} cardUseState={{selectedCard, setSelectedCard}}
                                   hint={vanity || username ? "User: " : "SteamID: "} value={username ? username : (vanity ? vanity : id)}/>
                <ClickableStatCard cardType={Tabs.ALL_GAMES} cardUseState={{selectedCard, setSelectedCard}}
                                   hint="All games: " value={data?.counts.allGames || 0}/>
                <ClickableStatCard cardType={Tabs.GAMES_WITHOUT_ACHIEVEMENTS} cardUseState={{selectedCard, setSelectedCard}}
                                   hint="Has no achievements: " value={data?.counts.gamesWithoutAchievements || 0}/>
                <ClickableStatCard cardType={Tabs.GAMES_WITH_ACHIEVEMENTS} cardUseState={{selectedCard, setSelectedCard}}
                                   hint="Has achievements: " value={data?.counts.gamesWithAchievements || 0}/>
                <ClickableStatCard cardType={Tabs.NEVER_PLAYED_GAMES} cardUseState={{selectedCard, setSelectedCard}}
                                   hint="Never played: " value={data?.counts.neverPlayedGames || 0}/>
                <ClickableStatCard cardType={Tabs.COMPLETED_GAMES} cardUseState={{selectedCard, setSelectedCard}}
                                   hint="Completed games: " value={data?.counts.completedGames || 0}/>
                <ClickableStatCard cardType={Tabs.ACHIEVEMENTS} cardUseState={{selectedCard, setSelectedCard}}
                                   hint="Achievements: " value={0}/>

            </div>
            <ExtendedStats selectedCard={selectedCard}/>
        </>

    )
}
