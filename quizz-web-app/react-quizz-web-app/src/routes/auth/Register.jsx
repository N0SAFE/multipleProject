import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { flash } from "react-universal-flash";

function Register() {
    const navigate = useNavigate();
    const authContext = useAuth();

    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData(e.target);
        const firstName = data.get("firstName");
        const lastName = data.get("lastName");
        const email = data.get("email");
        const password = data.get("password");
        const passwordConfirm = data.get("passwordConfirm");

        authContext
            .register({
                firstName,
                lastName,
                email,
                password,
                passwordConfirm
            })
            .then(() => {
                flash(6000, {
                    type: "success",
                    message: "You are now registered"
                });
                navigate("/");
            })
            .catch(errors => {
                errors.forEach(error => {
                    flash(6000, {
                        type: "error",
                        message: error.message
                    });
                });
            });
    };

    return (
        <div>
            <h1>Register</h1>
            <form
                onSubmit={handleSubmit}
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
                    <label htmlFor="firstName">first name:</label>
                    <input type="text" name="firstName" id="firstName" />
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
                    <label htmlFor="lastName">last name:</label>
                    <input type="text" name="lastName" id="lastName" />
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

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        gap: "10px"
                    }}
                >
                    <label htmlFor="passwordConfirm">Password Confirm:</label>
                    <input type="password" name="passwordConfirm" id="passwordConfirm" />
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
