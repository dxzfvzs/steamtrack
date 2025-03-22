"use client"

import "./detailed-stats.css";
import GameTable from "@/components/game-table/game-table";
import {Games} from "@/api/all-games-fetcher";

export default function GameStats({data}: { data: Games[] }) {
    return (
        <div className="section section--stats round-border ">
            <div className="generic-stats">
                <GameTable data={data} />
            </div>
        </div>
    )
};