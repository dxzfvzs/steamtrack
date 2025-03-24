"use client"
import "../game-table.css";

interface PlaytimeCellProps {
    time: number
}

const minutesToReadable = (minutes: number): string => {
    if (minutes === 0) {
        return "0";
    }

    const hours = Math.floor(minutes / 60);
    const remainedMinutes = minutes % 60;
    return `${hours} ${hours == 1 ? "hour" : "hours"} ${remainedMinutes} ${remainedMinutes == 1 ? "min" : "mins"}`;
};

export default function PlaytimeCell({time}: PlaytimeCellProps) {
    return (
        <td>
            <span className={`boring center ${time ? "" : "empty"}`}>
                {minutesToReadable(time)}
            </span>
        </td>
    )
}
