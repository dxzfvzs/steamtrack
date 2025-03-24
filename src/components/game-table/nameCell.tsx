"use client"
import "./game-table.css";

interface NameCellProps {
    appid: number;
    name: string;
}

export default function NameCell({name, appid}: NameCellProps) {
    return (
        <td>
            <a target="_blank"
               href={`https://store.steampowered.com/app/${appid}`}
               className="interesting">
                {name}
            </a>
        </td>
    )
}
