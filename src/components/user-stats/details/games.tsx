"use client"

import "./detailed-stats.css";
import GameTable from "@/components/table/game-table";
import {AchievementData} from "@/types";

interface GameStatsProps {
    data: AchievementData[]
}

export default function GameStats({data}: GameStatsProps) {
    return (
        <div className="section section--stats round-border ">
            <div className="generic-stats">
                <GameTable data={data}/>
            </div>
        </div>
    )
};