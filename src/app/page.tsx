"use client"

import IdInput from "@/components/id-input/id-input";
import UserStats from "@/components/user-stats/user-stats";
import {UserIdProvider} from "@/hooks/userId";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useState} from "react";

export default function Home() {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <>
            <UserIdProvider>
                <QueryClientProvider client={queryClient}>
                    <UserStats/>
                </QueryClientProvider>
                <IdInput/>
            </UserIdProvider>
        </>
    );
}
