import "./id-input.css";
import GenericIdInput from "@/components/id-input/generic-id-input";
import {FormEvent, useRef, useState} from "react";

export default function GameIdInput() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<string>("");

    const handleInputSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setMessage("");

        const inputValue = inputRef.current?.value;
        if (!inputValue) {
            return;
        }

        const ids = inputValue.split(",").map(id => Number(id.trim()));
        // TODO: add these for achievement query
    };

    return (
        <GenericIdInput label={"Any games missing? Add their IDs here, comma separated."}
                        placeholder={"10, 100, ..."}
                        error={message}
                        toBeRendered={false}
                        inputRef={inputRef}
                        handleSubmit={handleInputSubmit}
        />
    );
}
