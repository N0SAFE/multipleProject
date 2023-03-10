import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home.jsx";
import Creation from "./routes/Quizz/Creation.jsx";
import Quizz from "./routes/Quizz/Quizz.jsx";
import List from "./routes/Quizz/List.jsx";
import Login from "./routes/auth/Login.jsx";
import Logout from "./routes/auth/Logout.jsx";
import Register from "./routes/auth/Register.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import RightCornerLayout from "./layout/RightCornerLayout.jsx";
import Profile from "./routes/Profile/Profile.jsx";
import Me from "./routes/Profile/Me.jsx";
import ProfileQuizzList from "./routes/Profile/QuizzList.jsx";

function Router() {
    return (
        <Routes>
            <Route element={<RightCornerLayout />}>
                <Route element={<AuthLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/quizz/creation" element={<Creation />} />
                    <Route path="/quizz/:id" element={<Quizz />} />
                    <Route path="/quizz/list" element={<List />} />
                    <Route>
                        <Route path="/profile/me" element={<Me />} />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/profile/quizz/list" element={<ProfileQuizzList />} />
                    </Route>
                </Route>
                <Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/register" element={<Register />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default Router;
