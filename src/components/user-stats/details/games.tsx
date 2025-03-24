"use client"

import "./detailed-stats.css";
import GameTable from "@/components/game-table/game-table";
import {AchievementData} from "@/hooks/useUserGames";

interface GameStatsProps {
    data: AchievementData[]
}

export default function GameStats({data}: GameStatsProps) {
    const games = data.map(game => game.game);
    return (
        <div className="section section--stats round-border ">
            <div className="generic-stats">
                <GameTable data={data}/>
            </div>
        </div>
    )
};