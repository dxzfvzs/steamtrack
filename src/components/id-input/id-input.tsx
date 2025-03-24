"use client"

import "./id-input.css";
import {useUserIdContext} from "@/hooks/userId";
import {Dispatch, FormEvent, SetStateAction, useRef, useState} from "react";
import {getExtraUserInfo, getUserIdFromVanity} from "@/api/vanity-resolver";
import ErrorBox from "@/components/error/error-box";

const isSteamId = (id: string) => {
    return id.length == 17 && /^[0-9]+$/.test(id);
}

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

export default function IdInput() {
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
        <>
            <div className="section round-border id-input-section">
                <form className="id-input-form" onSubmit={handleInputSubmit}>
                    <label className="id-input__label" htmlFor="id-input">Your SteamID or vanity:</label>
                    <div className="id-input__container flex-gap">
                        <input className="id-input__input round-border" type="text" name="id" ref={inputRef}
                               required={true}
                               placeholder="Your SteamID or vanity goes here"/>
                        <button className="id-input__button round-border" type="submit" value="SteamID">Confirm</button>
                    </div>
                </form>
            </div>
            {message &&
                <ErrorBox message={message}/>
            }
        </>
    );
}
