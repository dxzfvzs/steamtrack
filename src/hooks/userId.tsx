"use client";

import {createContext, ReactNode, useContext, useState} from "react";

interface User {
    id: string,
    vanity?: string,
    username?: string,
    picture?: string,
}

const UserIdContext = createContext<{
    user: User | null;
    setUser: (user: User | null) => void;
} | null>(null);

export function UserIdProvider({children}: { children: ReactNode }) {
    const [user, setUserState] = useState<User | null>(null);

    const setUser = (user: User | null) => {
        setUserState(user);
    };

    return (
        <UserIdContext.Provider value={{user, setUser}}>
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
