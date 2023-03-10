import React from 'react';
import { Link } from 'react-router-dom';
import MyQuizz from './MyQuizz.jsx';
function ProfileInfo({user}){
    return (
        <div>
            <h1>Profile</h1>
            <h2>Info</h2>
            <div>
                <p>First name: {user?.first_name}</p>
                <p>Last name: {user?.last_name}</p>
                <p>Email: {user?.email}</p>
                <p>Role: {user?.role}</p>
            </div>
            <Link to="/profile/edit/:id">Edit</Link>
            <MyQuizz user={user} />
        </div>
    );
}

export default ProfileInfo;
