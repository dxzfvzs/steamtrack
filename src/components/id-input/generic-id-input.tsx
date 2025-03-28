import "./id-input.css";
import ErrorBox from "@/components/error/error-box";
import {FormEvent, RefObject} from "react";

interface InputProps {
    label: string;
    placeholder: string;
    error: string;
    toBeRendered: boolean;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    inputRef: RefObject<HTMLInputElement | null>
}

export default function GenericIdInput({label, placeholder, error, toBeRendered, handleSubmit, inputRef}: InputProps) {

    if (!toBeRendered) return (<></>);

    return (
        <div className="id-input-section">
            <div className="section round-border">

                <form className="id-input-form" onSubmit={handleSubmit}>
                    <label className="id-input__label" htmlFor="id-input">{label}</label>
                    <div className="id-input__container flex-gap">
                        <input className="id-input__input round-border" type="text" name="id" required={true}
                               ref={inputRef}
                               placeholder={placeholder}
                        />
                        <button className="id-input__button round-border" type="submit" value="SteamID">
                            Submit!
                        </button>
                    </div>
                </form>

            </div>
            {error && <ErrorBox message={error}/>}
        </div>
    );
}
