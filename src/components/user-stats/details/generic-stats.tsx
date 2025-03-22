"use client"

import "./detailed-stats.css";
import {useUserIdContext} from "@/hooks/userId";

export default function GenericStats() {
    const {user: {id, vanity}} = useUserIdContext();

    const url = `https://steamcommunity.com/profiles/${id}/`;

    return (
        <div className="section section--stats round-border ">
            <div className="generic-stats">

                <div className="info-snippet">
                    <span className="bold">SteamID: </span>
                    <span>{id}</span>
                </div>
                {vanity &&
                    <div className="info-snippet">
                        <span className="bold">Vanity: </span>
                        <span>{vanity}</span>
                    </div>
                }
                <div className="info-snippet">
                    <span className="bold">Link to profile: </span>
                    <a className="link" href={url}>{url}</a>
                </div>
            </div>
        </div>
    )
}
