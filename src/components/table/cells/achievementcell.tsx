"use client"
import "../table.css";

interface AchievementCellProps {
    achievements: number | undefined
}

const getAchievementClassname = (achievements: number | undefined) => {
    const base = "boring center";
    const empty = achievements == 0 ? "empty" : "";
    const undef = achievements === undefined ? "loading" : "";
    return `${base} ${empty} ${undef}`;
}


export default function AchievementCell({achievements}: AchievementCellProps) {
    return (
        <td>
            <span className={getAchievementClassname(achievements)}>
                {achievements == undefined ? "" : achievements}
            </span>
        </td>
    )
}
