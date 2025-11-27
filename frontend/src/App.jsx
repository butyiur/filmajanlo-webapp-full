import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import MovieList from "./pages/MovieList.jsx";
import MovieForm from "./pages/MovieForm.jsx";
import CategoryList from "./pages/CategoryList.jsx";
import Login from "./pages/Login.jsx"; // ⬅

export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<MovieList />} />
                <Route path="/movies/new" element={<MovieForm />} />
                <Route path="/movies/:id/edit" element={<MovieForm />} />
                <Route path="/categories" element={<CategoryList />} />
                <Route path="/login" element={<Login />} /> {/* ⬅ */}
            </Routes>
        </>
    );
}