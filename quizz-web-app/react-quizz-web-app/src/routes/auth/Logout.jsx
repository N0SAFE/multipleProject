import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { flash } from "react-universal-flash";
import { useEffect } from "react";

function Logout() {
    useEffect(() => {
        logout().then(() => {
            flash(6000, { type: "success", message: "You are now logged out" });
            navigate("/login");
        }).catch(() => {
            flash(6000, { type: "error", message: "Logout failed" });
            navigate("/login");
        });
    }, []);
    
    const { logout } = useAuth();
    const navigate = useNavigate();
}

export default Logout;
