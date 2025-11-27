import { useEffect, useState } from "react";
import api from "./api/client";

function App() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        api
            .get("/movies")
            .then((res) => {
                setMovies(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Hiba történt a filmek betöltésekor");
                setLoading(false);
            });
    }, []);

    if (loading) return <div style={{ padding: 20 }}>Betöltés...</div>;
    if (error) return <div style={{ padding: 20, color: "red" }}>{error}</div>;

    return (
        <div style={{ padding: 20 }}>
            <h1>Filmajánló</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <strong>{movie.title}</strong> ({movie.releaseYear}) –{" "}
                        {movie.category?.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;