"use client"
import "./game-table.css";
import PlaytimeCell from "@/components/game-table/cells/playtimecell";
import AchievementCell from "@/components/game-table/cells/achievementcell";
import {AchievementData} from "@/hooks/useUserGames";
import AppIdCell from "@/components/game-table/cells/appIdCell";
import NameCell from "@/components/game-table/cells/nameCell";
import {useState} from "react";

interface GameTableProps {
    data: AchievementData[]
}

interface GameData {
    appid: number,
    name: string,
    achievements: number | undefined,
    totalAchievements: number | undefined,
    playtime2Week: number,
    playtimeForever: number,
}

function castTableData(data: AchievementData[]) {
    return data.map((aData) => {
        return {
            appid: aData.game.appid,
            name: aData.game.name,
            playtime2Week: aData.game.playtime_2weeks,
            playtimeForever: aData.game.playtime_forever,
            achievements: !aData.achievements ? undefined : aData.achievements.length,
            totalAchievements: !aData.achievements ? undefined : aData.achievements.length,
        }
    })
}

const ascendingDefaults = ["name"];

export default function GameTable({data}: GameTableProps) {
    const [sortConfig, setSortConfig] = useState<{ key: keyof GameData; ascending: boolean } | null>(null);
    const [tableData, setTableData] = useState<GameData[]>(castTableData(data));

    const handleSort = (key: keyof GameData) => {
        let ascending = sortConfig && sortConfig.key === key ? !sortConfig.ascending : ascendingDefaults.includes(key);

        const sortedData = [...tableData].sort((a, b) => {
            const valA = a[key] ?? 0;
            const valB = b[key] ?? 0;

            if (valA < valB) return ascending ? -1 : 1;
            if (valA > valB) return ascending ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, ascending });
        setTableData(sortedData);
    };

    if (data.length == 0) {
        return <>This category has 0 games to show 🥺</>;
    }

    return (
        <table className="table">

            <thead className="table--header">
            <tr>
                <th className="id-th">App ID</th>
                <th onClick={() => handleSort("name")} className="sortable gamename">Name</th>

                <th onClick={() => handleSort("achievements")} className="sortable ach-th">Completed</th>
                <th onClick={() => handleSort("totalAchievements")} className="sortable ach-th">Total A.</th>

                <th onClick={() => handleSort("playtime2Week")} className="sortable time-th">Playtime (2 Weeks)</th>
                <th onClick={() => handleSort("playtimeForever")} className="sortable time-th">Playtime (Forever)</th>
            </tr>
            </thead>

            <tbody className="table--body">
            {tableData.map((entry, index) => (
                <tr className="body-tr" key={index}>

                    <AppIdCell appid={entry.appid}/>
                    <NameCell appid={entry.appid} name={entry.name}/>

                    <AchievementCell achievements={entry.achievements}/>
                    <AchievementCell achievements={entry.totalAchievements}/>

                    <PlaytimeCell time={entry.playtime2Week}/>
                    <PlaytimeCell time={entry.playtimeForever}/>
                </tr>
            ))}
            </tbody>

        </table>
    )
}
