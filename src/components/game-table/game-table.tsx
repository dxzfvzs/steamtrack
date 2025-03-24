"use client"
import "./game-table.css";
import {Achievement, Game} from "@/api/all-games-fetcher";
import {useMemo, useState} from "react";
import PlaytimeCell from "@/components/game-table/playtimecell";
import AchievementCell from "@/components/game-table/achievementcell";
import {AchievementData} from "@/hooks/useUserGames";


const sortingConfig: Record<string, { key: keyof Game; ascending: boolean }> = {
    name: {key: "name", ascending: false},
    playtime_2weeks: {key: "playtime_2weeks", ascending: true},
    playtime_forever: {key: "playtime_forever", ascending: true},
};

const sortGames = (data: AchievementData[], sortConfig: { key: keyof Game; ascending: boolean } | null) => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
        const valA = a.game[sortConfig.key] ?? 0;
        const valB = b.game[sortConfig.key] ?? 0;
        return valA < valB ? (sortConfig.ascending ? 1 : -1) : valA > valB ? (sortConfig.ascending ? -1 : 1) : 0;
    });
};

interface GameTableProps {
    data: AchievementData[]
}

export default function GameTable({data}: GameTableProps) {
    const [sortConfig, setSortConfig] = useState<{ key: keyof Game; ascending: boolean } | null>(null);
    const sortedData = useMemo(() => sortGames(data, sortConfig), [data, sortConfig]);

    const handleSort = (key: keyof Game) => {
        setSortConfig((prev) => ({
            key, ascending: prev?.key === key ? !prev.ascending : sortingConfig[key].ascending,
        }));
    };

    if (data.length == 0) {
        return <>This category has 0 games to show 🥺</>;
    }

    return (
        <table className="game-table">
            <thead className="game-table--header">
            <tr>
                <th className="sortable id-th">App ID</th>
                <th onClick={() => handleSort("name")} className="sortable gamename">Name</th>

                <th onClick={() => handleSort("playtime_2weeks")} className="sortable ach-th">Completed</th>
                <th onClick={() => handleSort("playtime_2weeks")} className="sortable ach-th">Total A.</th>

                <th onClick={() => handleSort("playtime_2weeks")} className="sortable time-th">Playtime (2 Weeks)</th>
                <th onClick={() => handleSort("playtime_forever")} className="sortable time-th">Playtime (Forever)</th>
            </tr>
            </thead>
            <tbody className="game-table-body">
            {sortedData.map(({game, achievements}, index) => (
                <tr className="body-tr" key={index}>

                    <td><a href={`https://store.steampowered.com/app/${game.appid}`} target="_blank"
                           className="boring boring-link">{game.appid}</a></td>
                    <td><a href={`https://store.steampowered.com/app/${game.appid}`} target="_blank"
                           className="interesting">{game.name}</a></td>

                    <AchievementCell achievements={achievements?.filter(a => a.achieved)}/>
                    <AchievementCell achievements={achievements}/>

                    <PlaytimeCell time={game.playtime_2weeks}/>
                    <PlaytimeCell time={game.playtime_forever}/>
                </tr>
            ))}
            </tbody>
        </table>
    )
}
