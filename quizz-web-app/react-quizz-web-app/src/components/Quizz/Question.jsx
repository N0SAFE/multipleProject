import React from "react";

function Question({ question, selectedPropositions, togleProposition, validateAnswer }) {
    return (
        <div>
            <h1>
                {question.question}
            </h1>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridGap: "10px",
                    marginBottom: "40px"
                }}
            >
                {question.propositions.map((proposition, index) =>{
                    return <button style={{ backgroundColor: selectedPropositions.includes(index) ? "green" : "" }} key={index} onClick={togleProposition} value={index}>
                        {proposition}
                    </button>}
                )}
            </div>
            <button onClick={validateAnswer}>Valider</button>
        </div>
    );
}

export default Question;
