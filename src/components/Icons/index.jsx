import "./Icons.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export function Icons() {
    const copyEmailToClipboard = () => {
        const email = "leguizabraian@hotmail.com";

        navigator.clipboard.writeText(email).then(() => {
            toast.success("E-mail copiado: " + email, {
                position: toast.POSITION.TOP_LEFT,
            });
        });
    };

    return (
        <div className="icons">
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/braian-leguiza-801677256"
            >
                <img src="linked.svg" alt="linked-image" />
            </a>
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/Braianleguiza"
            >
                <img src="github.svg" alt="github-image" />
            </a>
            <div
                style={{ cursor: "pointer" }}
                className="email-img"
                onClick={copyEmailToClipboard}
            >
                <img src="email.svg" alt="email-image" />
            </div>
            <ToastContainer />
        </div>
    );
}
