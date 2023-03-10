import React, { useContext, useEffect, useState } from "react";
import { useDirectus } from "react-directus";

const AuthContext = React.createContext({
    quizz: Array,
    auth: {
        token: localStorage.getItem("token"),
        isLogin: localStorage.getItem("token") !== null
    }
});

function AuthContextProvider({ children }) {
    const { directus } = useDirectus();
    console.log(directus);
    const [me, setMe] = useState({});
    const [isLogin, setIsLogin] = useState(localStorage.getItem("token") !== null);
    const login = ({ email, password }) => {
        return new Promise((resolve, reject) => {
            directus.auth
                .login({
                    email,
                    password
                })
                .then(response => {
                    if (response.errors) {
                        reject(response.errors);
                        return;
                    }
                    return updateMe().then(() => {
                        resolve(response);
                    });
                })
                .catch(error => {
                    reject([error]);
                });
        });
    };

    const logout = () => {
        return new Promise((resolve, reject) => {
            directus.auth.logout().finally(function() {
                updateMe().then(bool => {
                    if (bool === true) {
                        console.warn("Logout failed a user is still logged in");
                        console.warn("a second instance of the application is running!");
                        reject();
                        return;
                    }
                    resolve();
                });
            });
        });
    };

    const register = ({ email, password, passwordConfirm, firstName, lastName }) => {
        return new Promise((resolve, reject) => {
            if (password !== passwordConfirm) {
                reject([
                    {
                        message: "Password and password confirm are not the same"
                    }
                ]);
                return;
            }
            directus
                .items("directus_users")
                .createOne({
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    password,
                    status: "active",
                    role: "69fd330c-9153-46b5-ba58-780e43e61858"
                })
                .then(response => {
                    if (response.errors) {
                        reject(response.errors);
                        return;
                    }
                    login({ email, password }).then(response => {
                        resolve(response);
                    });
                });
        });
    };

    const updateMe = () => {
        return new Promise((resolve, reject) => {
            directus.users.me
                .read()
                .then(response => {
                    localStorage.setItem("token", response.access_token);
                    setMe(response);
                    setIsLogin(true);
                    resolve(true);
                })
                .catch(() => {
                    localStorage.removeItem("token");
                    setMe({});
                    setIsLogin(false);
                    resolve(false);
                });
        });
    };

    useEffect(() => {
        updateMe();
    }, []);

    console.log("isLogin", isLogin);
    console.log("me", me);

    return isLogin === true && JSON.stringify(me) === "{}"
        ? <div /> // create a loading user component
        : <AuthContext.Provider value={{ isLogin, me, login, logout, register }}>
              {children}
          </AuthContext.Provider>;
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthContext, AuthContextProvider, useAuth };
