import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/client";

export default function UserMovieForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        title: "",
        director: "",
        releaseYear: 2020,
        rating: 7.0,
        description: "",
        posterUrl: "",
        categoryId: ""
    });

    const change = (k, v) => {
        setForm(prev => {
            const updated = { ...prev, [k]: v };
            localStorage.setItem("userMovieDraft", JSON.stringify(updated));
            return updated;
        });
    };

    // --- Kategóriák betöltése ---
    useEffect(() => {
        api.get("/categories").then(r => setCategories(r.data));
    }, []);

    // --- Film betöltése / Draft visszaállítása ---
    useEffect(() => {
        let mounted = true;
        const draft = localStorage.getItem("userMovieDraft");

        const load = async () => {
            try {
                if (id) {
                    const { data } = await api.get(`/user/movies/${id}`);
                    if (mounted) {
                        setForm({
                            title: data.title ?? "",
                            director: data.director ?? "",
                            releaseYear: data.releaseYear ?? 2020,
                            rating: data.rating ?? 7.0,
                            description: data.description ?? "",
                            posterUrl: data.posterUrl ?? "",
                            categoryId: data.category?.id ?? ""
                        });
                    }
                } else if (draft) {
                    setForm(JSON.parse(draft));
                }
            } finally {
                if (mounted) setLoading(false);
            }
        };

        load();
        return () => (mounted = false);
    }, [id]);

    // --- MENTÉS ---
    const submit = async (e) => {
        e.preventDefault();

        const payload = {
            title: form.title,
            director: form.director,
            releaseYear: Number(form.releaseYear),
            rating: Number(form.rating),
            description: form.description,
            posterUrl: form.posterUrl,
            category: form.categoryId ? { id: Number(form.categoryId) } : null
        };

        try {
            if (id) await api.put(`/user/movies/${id}`, payload);
            else await api.post("/user/movies", payload);

            localStorage.removeItem("userMovieDraft");
            navigate("/my-movies");
        } catch (err) {
            console.error("❌ Error while saving:", err);
        }
    };

    if (loading) return <div className="form-loading">Betöltés...</div>;

    return (
        <div className="page-user-form">
            <div className="form-card">

                <h2 className="form-title">
                    {id ? "Edit own movie" : "Adding to own list"}
                </h2>

                <form onSubmit={submit}>
                    <input
                        className="form-input"
                        placeholder="Title *"
                        required
                        value={form.title}
                        onChange={(e) => change("title", e.target.value)}
                    />

                    <input
                        className="form-input"
                        placeholder="Director"
                        value={form.director}
                        onChange={(e) => change("director", e.target.value)}
                    />

                    <div className="form-row">
                        <input
                            className="form-input"
                            placeholder="Release year"
                            type="number"
                            value={form.releaseYear}
                            onChange={(e) => change("releaseYear", e.target.value)}
                        />

                        <input
                            className="form-input"
                            placeholder="Rating (1–10)"
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={form.rating}
                            onChange={(e) => change("rating", e.target.value)}
                        />
                    </div>

                    <textarea
                        className="form-input"
                        placeholder="Description"
                        rows="4"
                        value={form.description}
                        onChange={(e) => change("description", e.target.value)}
                    />

                    <input
                        className="form-input"
                        placeholder="Poster URL"
                        value={form.posterUrl}
                        onChange={(e) => change("posterUrl", e.target.value)}
                    />

                    {form.posterUrl && (
                        <img
                            src={form.posterUrl}
                            className="form-preview"
                            alt="Preview"
                            onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                    )}

                    <select
                        className="form-input"
                        value={form.categoryId}
                        onChange={(e) => change("categoryId", e.target.value)}
                    >
                        <option value="">Válassz kategóriát...</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                    <div className="form-btn-row">
                        <button
                            type="button"
                            className="action-btn action-delete form-action"
                            onClick={() => navigate("/my-movies")}
                        >
                            🗑️ Back
                        </button>

                        <button
                            type="submit"
                            className="action-btn action-edit form-action"
                        >
                            ✏️ Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}