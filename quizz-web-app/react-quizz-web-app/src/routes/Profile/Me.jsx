import ProfileComponent from "../../components/Profile/Profile.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

function Me() {
    const { me } = useAuth();
    return (
        <div>
            <ProfileComponent user={me} />
        </div>
    );
}

export default Me;
