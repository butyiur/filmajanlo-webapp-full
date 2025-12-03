import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // minimális validáció
        if (!username.trim() || !password.trim()) {
            setError("Töltsd ki az összes mezőt!");
            return;
        }

        try {
            // 🔹 FONTOS: itt már "password" kulccsal küldjük!
            const res = await api.post("/auth/register", {
                username,
                password,
            });

            setSuccess(
                typeof res.data === "string"
                    ? res.data
                    : "Sikeres regisztráció!"
            );

            // kis várakozás, majd átirányítás loginra
            setTimeout(() => navigate("/login"), 1000);
        } catch (err) {
            console.error(err);

            if (err.response?.status === 400) {
                // backend: "Username already taken!"
                setError(err.response.data || "A felhasználónév már foglalt!");
            } else {
                setError("Hiba történt a regisztráció során.");
            }
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
            <h2>Regisztráció</h2>

            {error && <div style={{ color: "red" }}>{error}</div>}
            {success && <div style={{ color: "green" }}>{success}</div>}

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

            <button type="submit">Regisztráció</button>

            <button
                type="button"
                onClick={() => navigate("/login")}
                style={{ marginTop: 8 }}
            >
                Van már fiókod? Bejelentkezés
            </button>
        </form>
    );
}