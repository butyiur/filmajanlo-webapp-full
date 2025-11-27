import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";

export default function MovieList() {
    const [movies, setMovies] = useState([]);
    const [categories, setCategories] = useState([]);

    // szűrők
    const [q, setQ] = useState("");
    const [director, setDirector] = useState("");
    const [cat, setCat] = useState("");
    const [yearFrom, setYearFrom] = useState("");
    const [yearTo, setYearTo] = useState("");

    useEffect(() => {
        api.get("/categories").then(res => setCategories(res.data));
    }, []);

    const fetchMovies = () => {
        const params = {};
        if (q.trim()) params.title = q;
        if (director.trim()) params.director = director;
        if (cat) params.categoryId = cat;
        if (yearFrom) params.yearFrom = yearFrom;
        if (yearTo) params.yearTo = yearTo;

        api.get("/movies/search", { params })
            .then(res => setMovies(res.data))
            .catch(() => setMovies([]));
    };

    // első betöltés + minden szűrő változására újrahívjuk a backendet
    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [q, director, cat, yearFrom, yearTo]);

    const remove = async (id) => {
        if (!confirm("Biztos törlöd?")) return;
        await api.delete(`/movies/${id}`);
        fetchMovies(); // frissítjük a szűrt listát
    };

    const clearFilters = () => {
        setQ("");
        setDirector("");
        setCat("");
        setYearFrom("");
        setYearTo("");
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Filmek</h2>

            {/* Szűrősor */}
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1.2fr 1fr 0.7fr 0.7fr auto", gap: 8, marginBottom: 12 }}>
                <input
                    placeholder="Keresés cím szerint…"
                    value={q}
                    onChange={e => setQ(e.target.value)}
                />
                <input
                    placeholder="Rendező…"
                    value={director}
                    onChange={e => setDirector(e.target.value)}
                />
                <select value={cat} onChange={e => setCat(e.target.value)}>
                    <option value="">Összes kategória</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <input
                    type="number"
                    placeholder="Év tól"
                    value={yearFrom}
                    onChange={e => setYearFrom(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Év ig"
                    value={yearTo}
                    onChange={e => setYearTo(e.target.value)}
                />
                <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={clearFilters}>Szűrők törlése</button>
                    <Link to="/movies/new" style={{ alignSelf: "center" }}>+ Új film</Link>
                </div>
            </div>

            {/* Lista */}
            <ul>
                {movies.map(m => (
                    <li key={m.id} style={{ marginBottom: 8 }}>
                        <strong>{m.title}</strong> ({m.releaseYear}) – {m.category?.name ?? "N/A"}
                        {m.director ? <> — <em>{m.director}</em></> : null}
                        <Link to={`/movies/${m.id}/edit`} style={{ marginLeft: 8 }}>Szerkesztés</Link>
                        <button onClick={() => remove(m.id)} style={{ marginLeft: 8 }}>Törlés</button>
                    </li>
                ))}
            </ul>

            {movies.length === 0 && (
                <div style={{ marginTop: 12, color: "#666" }}>
                    Nincs találat a megadott szűrőkre.
                </div>
            )}
        </div>
    );
}