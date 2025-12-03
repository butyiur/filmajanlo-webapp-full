import { useEffect, useState } from "react";
import api from "../api/client";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const load = async () => {
        const res = await api.get("/admin/users");
        setUsers(res.data);
    };

    useEffect(() => {
        load();
    }, []);

    const filtered = users.filter(u =>
        u.username.toLowerCase().includes(search.toLowerCase())
    );

    const deleteUser = async (id) => {
        if (!window.confirm("Biztosan törlöd ezt a felhasználót?")) return;

        await api.delete(`/admin/users/${id}`);
        load(); // újratöltés
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Felhasználók</h2>

            <input
                placeholder="Keresés felhasználónévre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ padding: 6, marginBottom: 12 }}
            />

            <table border="1" cellPadding="8">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Felhasználónév</th>
                    <th>Szerepkör</th>
                    <th>Létrehozva</th>
                    <th>Utolsó belépés</th>
                    <th>Műveletek</th>
                </tr>
                </thead>

                <tbody>
                {filtered.map(u => (
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.username}</td>
                        <td>{u.role}</td>
                        <td>{u.createdAt?.replace("T", " ")}</td>
                        <td>{u.lastLogin?.replace("T", " ") || "-"}</td>
                        <td>
                            <button
                                style={{ background: "red", color: "white" }}
                                onClick={() => deleteUser(u.id)}
                            >
                                Törlés
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}