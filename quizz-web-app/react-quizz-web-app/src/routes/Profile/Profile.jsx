import { useDirectus } from "react-directus";
import { useEffect, useState } from "react";
import ProfileComponent from "../../components/Profile/Profile.jsx";
import { useParams } from "react-router-dom";

function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const { directus } = useDirectus();
    const [isFetching, setIsFetching] = useState(true);
    useEffect(() => {
        directus.items("directus_users").readOne(id).then(response => {
            setUser(response);
            setIsFetching(false);
        });
    }, []);
    return (
        <div>
            {isFetching === true ? <div>Loading...</div> : <ProfileComponent user={user} />}
        </div>
    );
}

export default Profile;
