import { Navigate } from "react-router-dom";
import { auth } from "../api/client";

export default function ProtectedRoute({ children }) {
    const loggedIn = !!auth.get();
    return loggedIn ? children : <Navigate to="/login" replace />;
}