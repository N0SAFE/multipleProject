import { BrowserRouter } from "react-router-dom";
import { DirectusProvider } from "react-directus";
import { RenderFlash } from "react-universal-flash";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import Router from "./Router";

function App() {
    return (
        <DirectusProvider
            apiUrl="http://localhost:5109"
            options={{
                auth: {
                    mode: "cookie"
                }
            }}
        >
            <AuthContextProvider>
                <RenderFlash>
                    {flashes => {
                        return (
                            <div
                                style={{
                                    position: "absolute",
                                    top: 10,
                                    right: 10,
                                    transition: "all 0.5s ease-in-out 0.5s"
                                }}
                            >
                                {flashes.map(flash => {
                                    const { type, message } = flash.data[0];
                                    return (
                                        <div
                                            style={{
                                                margin: 10,
                                                padding: 5,
                                                borderRadius: 5,
                                                background: { success: "green", error: "red", info: "yellow" }[type],
                                                color: { success: "white", error: "white", info: "black" }[type],
                                                transition: "all 0.5s ease-in-out 0.5s"
                                            }}
                                            key={flash.id}
                                        >
                                            <label>
                                                {message}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    }}
                </RenderFlash>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </AuthContextProvider>
        </DirectusProvider>
    );
}

export default App;
