import { Link } from "react-router-dom";
export default function NotFound() {
    return (
        <div style={{ padding: 20 }}>
            <h2>404 – Az oldal nem található</h2>
            <p>Vissza a <Link to="/">főoldalra</Link>.</p>
        </div>
    );
}