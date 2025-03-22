"use client"
import "./game-table.css";
import {Achievement, Games} from "@/api/all-games-fetcher";
import {useMemo, useState} from "react";

const getAchievementClassname = (total_achievements: Achievement[] | undefined) => {
    const base = "boring center ";
    if (!total_achievements) {
        return base + "loading";
    }
    if (total_achievements.length == 0) {
        return base + "empty";
    }
    return base;
}

const minutesToReadable = (minutes: number | undefined): string => {
    if (!minutes || minutes == 0) {
        return "0";
    }
    const hours = Math.floor(minutes / 60);
    const remainedMinutes = minutes % 60;
    return `${hours} ${hours == 1 ? "hour" : "hours"} ${remainedMinutes} ${remainedMinutes == 1 ? "min" : "mins"}`;
};

const sortingConfig: Record<string, { key: keyof Games; ascending: boolean }> = {
    name: {key: "name", ascending: false},
    playtime_2weeks: {key: "playtime_2weeks", ascending: true},
    playtime_forever: {key: "playtime_forever", ascending: true},
};

const sortGames = (data: Games[], sortConfig: { key: keyof Games; ascending: boolean } | null) => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
        const valA = a[sortConfig.key] ?? 0;
        const valB = b[sortConfig.key] ?? 0;
        return valA < valB ? (sortConfig.ascending ? 1 : -1) : valA > valB ? (sortConfig.ascending ? -1 : 1) : 0;
    });
};

export default function GameTable({data}: { data: Games[] }) {
    const [sortConfig, setSortConfig] = useState<{ key: keyof Games; ascending: boolean } | null>(null);
    const sortedData = useMemo(() => sortGames(data, sortConfig), [data, sortConfig]);

    const handleSort = (key: keyof Games) => {
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
            {sortedData.map((game, index) => (
                <tr className="body-tr" key={index}>

                    <td><span className="boring">{game.appid}</span></td>
                    <td><a href={`https://store.steampowered.com/app/${game.appid}`} target="_blank"
                           className="interesting">{game.name}</a></td>

                    <td>
                        <span className={getAchievementClassname(game.total_achievements)}>
                            {!game.total_achievements ? "" : game.total_achievements.length || 0}
                        </span>
                    </td>
                    <td>
                        <span className={getAchievementClassname(game.total_achievements?.filter(a => a.unlocked))}>
                            {!game.total_achievements ? "" : game.total_achievements.filter(a => a.unlocked).length || 0}
                        </span>
                    </td>

                    <td>
                        <span className={`boring center ${game.playtime_2weeks ? "" : "empty"}`}>
                            {minutesToReadable(game.playtime_2weeks)}
                        </span>
                    </td>
                    <td>
                        <span className={`boring center ${game.playtime_forever ? "" : "empty"}`}>
                            {minutesToReadable(game.playtime_forever)}
                        </span>
                    </td>

                </tr>
            ))}
            </tbody>
        </table>
    )
}
