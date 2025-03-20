"use client";

import { createContext, useContext, useState } from "react";

const UserIdContext = createContext<{
    userId: string;
    setUserId: (id: string) => void;
} | null>(null);

export function UserIdProvider({ children }: { children: React.ReactNode }) {
    const [userId, setUserId] = useState<string>("");

    return (
        <UserIdContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserIdContext.Provider>
    );
}

export function useUserIdContext() {
    const context = useContext(UserIdContext);
    if (!context) {
        throw new Error("No UserIdContext provider found.");
    }
    return context;
}
