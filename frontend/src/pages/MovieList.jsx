import { useEffect, useMemo, useState } from "react";
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

    // pagináció + rendezés
    const [page, setPage] = useState(0);        // 0-index
    const [size, setSize] = useState(10);
    const [sort, setSort] = useState("releaseYear,desc");

    // total oldalszám a backend Page<?> válaszából
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    useEffect(() => {
        api.get("/categories").then(res => setCategories(res.data));
    }, []);

    // kis debounce a beviteli mezőkre
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const t = setTimeout(() => setTick(tick + 1), 300);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [q, director, yearFrom, yearTo]); // ezek gépelős mezők

    const fetchMovies = () => {
        const params = { page, size, sort };
        if (q.trim()) params.title = q;
        if (director.trim()) params.director = director;
        if (cat) params.categoryId = cat;
        if (yearFrom) params.yearFrom = yearFrom;
        if (yearTo) params.yearTo = yearTo;

        api.get("/movies/search", { params })
            .then(res => {
                setMovies(res.data.content ?? res.data); // Page vagy sima lista fallback
                setTotalPages(res.data.totalPages ?? 1);
                setTotalElements(res.data.totalElements ?? (res.data.content?.length || res.data.length || 0));
            })
            .catch(() => {
                setMovies([]);
                setTotalPages(0);
                setTotalElements(0);
            });
    };

    // szűrő vagy lapozó/rendezés változásra kérdezzük a backendet
    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tick, cat, page, size, sort]);

    const remove = async (id) => {
        if (!confirm("Biztos törlöd?")) return;
        await api.delete(`/movies/${id}`);
        fetchMovies();
    };

    const clearFilters = () => {
        setQ(""); setDirector(""); setCat(""); setYearFrom(""); setYearTo("");
        setPage(0);
    };

    const sortOptions = [
        { v: "releaseYear,desc", label: "Év (csökkenő)" },
        { v: "releaseYear,asc",  label: "Év (növekvő)" },
        { v: "rating,desc",      label: "Értékelés (csökkenő)" },
        { v: "rating,asc",       label: "Értékelés (növekvő)" },
        { v: "title,asc",        label: "Cím (A→Z)" },
        { v: "title,desc",       label: "Cím (Z→A)" },
    ];

    return (
        <div style={{ padding: 20 }}>
            <h2>Filmek</h2>

            {/* Szűrősor */}
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1.2fr 1fr 0.7fr 0.7fr 1fr auto", gap: 8, marginBottom: 12 }}>
                <input placeholder="Keresés cím szerint…" value={q} onChange={e => { setQ(e.target.value); setPage(0); }} />
                <input placeholder="Rendező…" value={director} onChange={e => { setDirector(e.target.value); setPage(0); }} />
                <select value={cat} onChange={e => { setCat(e.target.value); setPage(0); }}>
                    <option value="">Összes kategória</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <input type="number" placeholder="Év tól" value={yearFrom} onChange={e => { setYearFrom(e.target.value); setPage(0); }} />
                <input type="number" placeholder="Év ig" value={yearTo} onChange={e => { setYearTo(e.target.value); setPage(0); }} />
                <select value={sort} onChange={e => { setSort(e.target.value); setPage(0); }}>
                    {sortOptions.map(o => <option key={o.v} value={o.v}>{o.label}</option>)}
                </select>
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

            {/* Pagináció */}
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <button disabled={page<=0} onClick={()=>setPage(p=>p-1)}>‹ Előző</button>
                <span>Oldal: {page+1} / {Math.max(totalPages,1)}</span>
                <button disabled={page+1 >= totalPages} onClick={()=>setPage(p=>p+1)}>Következő ›</button>
                <span style={{ marginLeft: 8 }}>Elem/oldal:</span>
                <select value={size} onChange={e=>{ setSize(Number(e.target.value)); setPage(0); }}>
                    {[5,10,20,50].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <span style={{ marginLeft: 8, color: "#666" }}>{totalElements} találat</span>
            </div>

            {movies.length === 0 && (
                <div style={{ marginTop: 12, color: "#666" }}>Nincs találat a megadott szűrőkre.</div>
            )}
        </div>
    );
}