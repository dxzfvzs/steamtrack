"use client"

import UserIdInput from "@/components/id-input/user-id-input";
import UserStatsOverview from "@/components/user-stats/user-stats-overview";
import {UserIdProvider} from "@/hooks/userId";
import GameIdInput from "@/components/id-input/game-id-input";

export default function Home() {
    return (
        <>
            <UserIdProvider>
                <UserStatsOverview/>
                <GameIdInput/>
                <UserIdInput/>
            </UserIdProvider>
        </>
    );
}
