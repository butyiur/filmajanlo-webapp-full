import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api, { auth } from "../api/client";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        if (!username.trim() || !password.trim()) {
            setError("Kérlek tölts ki minden mezőt!");
            return;
        }

        try {
            const res = await api.post("/auth/login", {
                username,
                password,
            });

            const token = res.data;

            // token mentése
            localStorage.setItem("token", token);

            // user adatainak lekérése
            const me = await api.get("/auth/me");
            auth.setLogin(token, me.data);

            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Hibás felhasználónév vagy jelszó!");
        }
    };

    return (
        <form
            onSubmit={submit}
            style={{
                padding: 20,
                display: "grid",
                gap: 8,
                maxWidth: 320,
                margin: "0 auto",
            }}
        >
            <h2>Bejelentkezés</h2>

            {error && <div style={{ color: "red" }}>{error}</div>}

            <input
                placeholder="Felhasználónév"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                placeholder="Jelszó"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Bejelentkezés</button>

            <div style={{ marginTop: 10, fontSize: 14 }}>
                Nincs még fiókod?{" "}
                <Link to="/register" style={{ color: "#007bff" }}>
                    Regisztráció
                </Link>
            </div>
        </form>
    );
}