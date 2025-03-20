"use client"

import "./id-input.css";
import {useUserIdContext} from "@/hooks/userId";
import {FormEvent, useRef} from "react";

const isSteamId = (id: string) => {
    return id.length == 14 && /^[0-9]+$/.test(id);
}

export default function IdInput() {
    const {setUserId} = useUserIdContext();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const inputValue = inputRef.current?.value;
        if (!inputValue) {
            return;
        }

        if (isSteamId(inputValue)) {
            setUserId(inputValue);
        } else {
            setUserId("vanity" + inputValue);
        }
    };

    return (
        <div className="section round-border">
            <form className="id-input-form" onSubmit={handleInputSubmit}>
                <label className="id-input__label" htmlFor="id-input">SteamID or vanity</label>
                <div className="id-input__container">
                    <input className="id-input__input round-border" type="text" name="id" ref={inputRef}
                           placeholder="Your SteamID goes here"/>
                    <button className="id-input__button round-border" type="submit" value="SteamID">Confirm</button>
                </div>
            </form>
        </div>
    );
}
