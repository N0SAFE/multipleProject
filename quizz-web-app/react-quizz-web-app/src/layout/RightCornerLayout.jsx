import { Link } from "react-router-dom";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function RightCornerLayout() {
    // log route name
    const location = useLocation();
    let active = location.pathname;
    const authContext = useAuth();
    const list = [["/profile/me", "Profile"], ["/", "Home"]]
    const authList = [["/login", "Login"], ["/register", "Register"], ["/logout", "Logout"]]

    if (active === "/") {
        list.splice(1, 1)
    }
    if (active === "/profile/me") {
        list.splice(0, 1)
    }
    if(!authContext.isLogin){
        list.length = 0
    }
    if (active === "/login") {
        authList.splice(0, 1)
    }
    if (active === "/register") {
        authList.splice(1, 1)
    }
    return (
        <div>
            <div
                style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10
                }}>
                    {list.map(function([path, name], index){
                    return (
                        <Link key={index} to={path}>
                            <label>{name}</label>
                        </Link>
                    )
                })}
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10
                }}>
                    {authList.map(function([path, name], index){
                    return (
                        <Link key={index} to={path}>
                            <label>{name}</label>
                        </Link>
                    )
                })}
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default RightCornerLayout;
