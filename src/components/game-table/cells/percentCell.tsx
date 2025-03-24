"use client"
import "../game-table.css";

interface AchievementProgressCellProps {
    progress: number,
    achieved: number | undefined,
}

const getAchievementClassname = (achieved: number | undefined, progress: number) => {
    const base = "boring center";
    const empty = achieved == 0 ? "empty" : "";
    const undef = achieved == undefined ? "loading" : "";
    const progressGood = progress > 70 ? "progress-good-text" : (progress > 35 ? "progress-neutral-text" : "progress-bad-text");
    return `${base} ${undef} ${empty || progressGood}`;
}

export default function AchievementProgressCell({progress, achieved}: AchievementProgressCellProps) {
    return (
        <td>
            <span className={getAchievementClassname(achieved, progress)}>
                {achieved == undefined ? "" : `${Math.round(progress)}%`}
            </span>
        </td>
    )
}
