import React, { useRef, useState } from "react";
import QuestionList from "../../components/Creation/QuestionList.jsx";

function Creation() {
    const titleRef = useRef();
    return (
        <div>
            <h1>Creation</h1>
            <p>
                titre du quizz: <input ref={titleRef} />
            </p>
            <QuestionList title={titleRef} />
        </div>
    );
}

export default Creation;
