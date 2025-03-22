import "./error-box.css";

export default function ErrorBox({ message }: { message: string }) {
    return (
        <div className="error-message round-border section">
            Error: {message}
        </div>
    );
}
