"use client"

import "./user-stats.css";
import {useUserIdContext} from "@/hooks/userId";

export default function UserStats() {
    const {userId} = useUserIdContext();

    if (!userId) {
        return <></>;
    }

    return (
        <div className="section round-border">
            {userId}
        </div>
    )
}
