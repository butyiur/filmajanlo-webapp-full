import { Link, useNavigate } from "react-router-dom";
import { auth } from "../api/client";

export default function Navbar() {
    const navigate = useNavigate();
    const loggedIn = !!auth.get();

    const logout = () => {
        auth.set("");
        navigate("/");
    };

    return (
        <nav style={{ padding: 12, borderBottom: "1px solid #ddd", display:"flex", gap:12 }}>
            <Link to="/">Filmek</Link>
            <Link to="/movies/new">Új film</Link>
            <Link to="/categories">Kategóriák</Link>
            <div style={{ marginLeft: "auto" }}>
                {loggedIn ? (
                    <button onClick={logout}>Kijelentkezés</button>
                ) : (
                    <Link to="/login">Bejelentkezés</Link>
                )}
            </div>
        </nav>
    );
}