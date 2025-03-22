"use client"

import "./id-input.css";
import {useUserIdContext} from "@/hooks/userId";
import {FormEvent, useRef, useState} from "react";
import {getUserIdFromVanity} from "@/api/vanity-resolver";
import ErrorBox from "@/components/error/error-box";

const isSteamId = (id: string) => {
    return id.length == 17 && /^[0-9]+$/.test(id);
}

export default function IdInput() {
    const {setUser} = useUserIdContext();
    const [message, setMessage] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const inputValue = inputRef.current?.value;
        if (!inputValue) {
            return;
        }

        if (isSteamId(inputValue)) {
            setUser(inputValue, "");
        } else {
            const response = await getUserIdFromVanity(inputValue);
            if (!response.ok) {
                setMessage(response.message ? response.message : "Error while resolving user id.");
                setUser("", "");
            }
            if (response.id) {
                setUser(response.id, inputValue);
                setMessage("");
            }
        }
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
                <ErrorBox message={message} />
            }
        </>
    );
}
