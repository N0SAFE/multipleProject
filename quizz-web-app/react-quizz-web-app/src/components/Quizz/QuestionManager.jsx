import React, { useState, useEffect } from "react";
import { useDirectus } from "react-directus";
import { flash } from "react-universal-flash";
import { useParams } from "react-router-dom";
import Question from "./Question";

function QuestionManager() {
    const { id } = useParams();
    const { directus } = useDirectus();
    const [questions, setQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedPropositions, setSelectedPropositions] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        // search quizz for the id 9
        directus.items("quizz").readOne(id, { fields: ["questions.question", "questions.propositions", "questions.id"] }).then(response => {
            setQuestions(response.questions);
        });
    }, []);

    useEffect(
        () => {
            if (questionIndex >= questions.length) {
                flash(3000, { type: "info", message: `Votre score est de ${score} / ${questions.length}` });
            }
        },
        [questionIndex]
    );

    const nextQuestion = () => {
        setQuestionIndex(questionIndex + 1);
        setSelectedPropositions([]);
    };

    const validateAnswer = () => {
        if(selectedPropositions.length === 0){
            flash(3000, { type: "error", message: "Vous devez choisir une réponse" });
            return;
        }else {
            directus.items("question").readOne(questions[questionIndex].id, { fields: ["answers"] }).then(response => {
                if (response.answers.every(value => selectedPropositions.includes(value))) {
                    setScore(score + 1);
                }
                nextQuestion();
            });
        }
    };

    const togleProposition = e => {
        const value = parseInt(e.target.value);
        const index = selectedPropositions.indexOf(value);
        const newAnswer = [...selectedPropositions];
        if (index > -1) {
            newAnswer.splice(index, 1);
        } else {
            newAnswer.push(value);
        }
        setSelectedPropositions(newAnswer);
    };

    return (
        <div>
            {questionIndex < questions.length
                ? <Question question={questions[questionIndex]} validateAnswer={validateAnswer} togleProposition={togleProposition} selectedPropositions={selectedPropositions} />
                : <div>
                    <h1>Fin du quizz</h1>
                    <p>
                        Votre score est de {score} / {questions.length}
                    </p>
                </div>}
        </div>
    );
}

export default QuestionManager;
