"use client";

import { createContext, useContext, useState } from "react";

const UserIdContext = createContext<{
    user: {id: string, vanity: string};
    setUser: (id: string, vanity: string) => void;
} | null>(null);

export function UserIdProvider({ children }: { children: React.ReactNode }) {
    const [user, setUserState] = useState<{ id: string; vanity: string }>({ id: "", vanity: "" });

    const setUser = (id: string, vanity: string) => {
        setUserState({ id, vanity });
    };

    return (
        <UserIdContext.Provider value={{ user, setUser }}>
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
