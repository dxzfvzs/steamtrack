"use client"
import "./game-table.css";
import {Games} from "@/api/all-games-fetcher";

const minutesToReadable = (minutes: number): string => {
    if (minutes == 0) {
        return "";
    }
    const hours = Math.floor(minutes / 60);
    const remainedMinutes = minutes % 60;
    return `${hours} ${hours == 1 ? "hour" : "hours"} ${remainedMinutes} ${remainedMinutes == 1 ? "min" : "mins"}`;
};

export default function GameTable({data}: { data: Games[] }) {
    return (
        <table className="game-table">
            <thead className="game-table--header">
            <tr>
                <th>App ID</th>
                <th>Name</th>
                <th>Playtime (2 Weeks)</th>
                <th>Playtime (Forever)</th>
            </tr>
            </thead>
            <tbody className="game-table-body">
            {data.map((game, index) => (
                <tr className="body-tr" key={index}>
                    <td><span className="boring">{game.appid}</span></td>
                    <td><a href={`https://store.steampowered.com/app/${game.appid}`} target="_blank" className="interesting">{game.name}</a></td>
                    <td>{game.playtime_2weeks ? <span className="boring">{minutesToReadable(game.playtime_2weeks)}</span> : <span className="boring empty">0</span>}</td>
                    <td>{game.playtime_forever ? <span className="boring">{minutesToReadable(game.playtime_forever)}</span> : <span className="boring empty">0</span>}</td>

                </tr>
            ))}
            </tbody>
        </table>
    )
}
