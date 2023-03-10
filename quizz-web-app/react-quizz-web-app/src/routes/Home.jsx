import React from "react";
import { Link } from "react-router-dom";

function Home() {
    fetch('http://localhost:8055/flows/trigger/3bc8704b-d242-4774-b651-563bd6f877fc',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "question": 27,
                "answer": [
                    1,
                    3
                ]
            })
        }
    ).then(res => res.json()).then(res => console.log(res))
    return (
        <div>
            <h1>Home</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 20
                }}
            >
                <Link to="/quizz/list">Quizz</Link>
                <Link to="/quizz/creation">Creation</Link>
            </div>
        </div>
    );
}

export default Home;
