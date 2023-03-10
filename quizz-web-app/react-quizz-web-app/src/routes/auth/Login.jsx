import React, { Component, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { flash } from "react-universal-flash";

function Login() {
    const authContext = useAuth();
    const navigate = useNavigate();
    
    return (
        <div>
            <h1>Login</h1>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    const data = new FormData(e.target);
                    authContext 
                        .login({
                            email: data.get("email"),
                            password: data.get("password")
                        })
                        .then(() => {
                            flash(6000, {
                                type: "success",
                                message: "You are now logged in"
                            });
                            console.log("logged in");
                            navigate("/");
                        }).catch(errors => {
                            errors.forEach(error => {
                                flash(6000, {
                                    type: "error",
                                    message: error.message
                                });
                            });
                        });
                }}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        gap: "10px"
                    }}
                >
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" />
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        gap: "10px"
                    }}
                >
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
