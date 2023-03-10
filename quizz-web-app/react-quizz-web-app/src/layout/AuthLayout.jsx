import { useAuth } from "../context/AuthContext.jsx";
import { Navigate, Outlet  } from "react-router-dom";

function AuthLayout(){
    const authContext = useAuth();
    console.log(authContext)
    if(!authContext.isLogin){
        return <Navigate to="/login" />
    }
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AuthLayout;
