import "./error-box.css";

interface ErrorBoxProps {
    message: string;
}

export default function ErrorBox({message}: ErrorBoxProps) {
    return (
        <div className="error-message round-border section">
            <span className="bold">Error:</span> {message}
        </div>
    );
}
