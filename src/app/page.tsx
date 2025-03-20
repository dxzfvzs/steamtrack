"use client"

import IdInput from "@/components/id-input/id-input";
import UserStats from "@/components/user-stats/user-stats";
import {UserIdProvider} from "@/hooks/userId";

export default function Home() {

    return (
        <>
            <UserIdProvider>
                <IdInput/>
                <UserStats/>
            </UserIdProvider>
        </>
    );
}
