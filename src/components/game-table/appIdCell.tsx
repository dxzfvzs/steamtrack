"use client"
import "./game-table.css";

interface AppIdCellProps {
    appid: number
}

export default function AppIdCell({appid}: AppIdCellProps) {
    return (
        <td>
            <a target="_blank"
               href={`https://store.steampowered.com/app/${appid}`}
               className="boring boring-link">{appid}
            </a>
        </td>
    )
}
