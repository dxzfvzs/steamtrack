"use client"
import "./table.css";
import PlaytimeCell from "@/components/table/cells/playtimecell";
import AchievementCell from "@/components/table/cells/achievementcell";
import AppIdCell from "@/components/table/cells/appIdCell";
import NameCell from "@/components/table/cells/nameCell";
import {useEffect, useState} from "react";
import AchievementProgressCell from "@/components/table/cells/percentCell";
import {AchievementData} from "@/types";
import {ascendingDefaults, castTableData, TableGameData} from "@/components/table/table-helper";

interface GameTableProps {
    data: AchievementData[]
}

export default function GameTable({data}: GameTableProps) {
    const [sortConfig, setSortConfig] = useState<{ key: keyof TableGameData; ascending: boolean } | null>(null);
    const [tableData, setTableData] = useState<TableGameData[]>(castTableData(data));

    useEffect(() => {
        setTableData(castTableData(data));
    }, [data]);

    const handleSort = (key: keyof TableGameData) => {
        let ascending = sortConfig && sortConfig.key === key ? !sortConfig.ascending : ascendingDefaults.includes(key);

        const sortedData = [...tableData].sort((a, b) => {
            const valA = a[key] ?? 0;
            const valB = b[key] ?? 0;

            if (valA < valB) return ascending ? -1 : 1;
            if (valA > valB) return ascending ? 1 : -1;
            return 0;
        });

        setSortConfig({key, ascending});
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
                <th onClick={() => handleSort("name")} className="sortable">Name</th>

                <th onClick={() => handleSort("achievedAchievements")} className="sortable ach-th">Achieved</th>
                <th onClick={() => handleSort("totalAchievements")} className="sortable ach-th">Total</th>

                <th onClick={() => handleSort("progress")} className="sortable ach-th">Average</th>

                <th onClick={() => handleSort("playtime2Week")} className="sortable time-th">Playtime (2 Weeks)</th>
                <th onClick={() => handleSort("playtimeForever")} className="sortable time-th">Playtime (Forever)</th>
            </tr>
            </thead>

            <tbody className="table--body">
            {tableData.map((entry, index) => (
                <tr className="body-tr" key={index}>

                    <AppIdCell appid={entry.appid}/>
                    <NameCell appid={entry.appid} name={entry.name}/>

                    <AchievementCell achievements={entry.achievedAchievements}/>
                    <AchievementCell achievements={entry.totalAchievements}/>

                    <AchievementProgressCell progress={entry.progress} achieved={entry.achievedAchievements}/>

                    <PlaytimeCell time={entry.playtime2Week}/>
                    <PlaytimeCell time={entry.playtimeForever}/>
                </tr>
            ))}
            </tbody>

        </table>
    )
}
