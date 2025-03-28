"use client"

import "./id-input.css";
import {useUserIdContext} from "@/hooks/userId";
import {Dispatch, FormEvent, SetStateAction, useRef, useState} from "react";
import {getUserIdFromVanity} from "@/api/vanity-resolver";
import {getExtraUserInfo} from "@/api/extra-user-info-fetcher";
import {isSteamId} from "@/evaluator";
import GenericIdInput from "@/components/id-input/generic-id-input";


const resolveUserId = async (vanity: string, setMessage: Dispatch<SetStateAction<string>>) => {
    if (isSteamId(vanity)) {
        return vanity;
    }
    const response = await getUserIdFromVanity(vanity);
    if (!response.ok) {
        setMessage(response.message ? response.message : "Error while resolving user id.");
    }
    return response.id;
}

export default function UserIdInput() {
    const {setUser} = useUserIdContext();
    const [message, setMessage] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setMessage("");

        const inputValue = inputRef.current?.value;
        if (!inputValue) {
            return;
        }

        const id = await resolveUserId(inputValue, setMessage);
        if (!id) {
            setUser(null);
            return;
        }

        const vanity = isSteamId(inputValue) ? undefined : inputValue;
        const {username, picture} = await getExtraUserInfo(id);
        setUser({id, vanity, username, picture});
    };

    return (
        <GenericIdInput label={"Your SteamID or vanity:"}
                        placeholder={"Your SteamID or vanity goes here"}
                        error={message}
                        toBeRendered={true}
                        inputRef={inputRef}
                        handleSubmit={handleInputSubmit}
        />
    );
}
