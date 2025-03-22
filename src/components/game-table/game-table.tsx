"use client"
import "./game-table.css";
import {Games} from "@/api/all-games-fetcher";

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
                    <td><span className="interesting">{game.name}</span></td>
                    <td>{game.playtime_2weeks ? <span className="boring">{game.playtime_2weeks}</span> : <span className="boring empty">0</span>}</td>
                    <td><span className="boring">{game.playtime_forever}</span></td>

                </tr>
            ))}
            </tbody>
        </table>
    )
}
