"use client"

import IdInput from "@/components/id-input/id-input";
import UserStatsOverview from "@/components/user-stats/user-stats-overview";
import {UserIdProvider} from "@/hooks/userId";

export default function Home() {
    return (
        <>
            <UserIdProvider>
                <UserStatsOverview/>
                <IdInput/>
            </UserIdProvider>
        </>
    );
}
