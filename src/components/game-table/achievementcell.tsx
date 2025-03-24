"use client"
import "./game-table.css";
import {Achievement} from "@/api/all-games-fetcher";

interface AchievementCellProps {
    achievements: Achievement[] | undefined
}

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


export default function AchievementCell({achievements}: AchievementCellProps) {
    return (
        <td>
            <span className={getAchievementClassname(achievements)}>
                {!achievements ? "" : achievements.length || 0}
            </span>
        </td>
    )
}
