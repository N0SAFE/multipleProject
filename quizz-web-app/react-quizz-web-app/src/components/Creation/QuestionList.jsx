import Question from "./Question";
import { useState, useEffect } from "react";
import { useDirectus } from "react-directus";
import { useNavigate } from "react-router-dom";
import { flash } from "react-universal-flash";
import { useAuth } from "../../context/AuthContext.jsx";

let id = 0;

function QuestionList({ title }) {
    const navigate = useNavigate();
    const { directus } = useDirectus();
    const [questionList, setQuestionList] = useState([]);
    const { me } = useAuth();
    const incrementId = () => {
        return id++;
    };
    const addQuestion = id => {
        setQuestionList([...questionList, { id: id, question: "chose a question", answers: [], propositions: [] }]);
    };
    const onFormSubmit = e => {
        e.preventDefault();
        const questionMapped = Array.from(e.target.elements).filter(element => element.name !== "").map(element => {
            const name = element.name.split("-");
            const id = name[0];
            const type = name[1];
            const index = name[2];
            const value = element.value;
            return { id: id, type: type, value: value, index: index };
        });

        console.log(questionMapped);

        const questionListObject = questionMapped.reduce((acc, question) => {
            if (acc[question.id] === undefined) {
                acc[question.id] = {};
            }
            if (question.type === "propositions") {
                if (acc[question.id][question.type] === undefined) {
                    acc[question.id][question.type] = [];
                }
                acc[question.id][question.type][question.index] = question.value;
                return acc;
            }
            if (question.type === "answers") {
                question.value = question.value.split(",").map(value => parseInt(value));
            }
            acc[question.id][question.type] = question.value;
            return acc;
        }, []);

        console.log(questionListObject);
        console.log(title.current.value);
        console.log(me);

        console.log({
            title: title.current.value,
            questions: questionListObject,
            owner: me.id
        });

        directus
            .items("quizz")
            .createOne({
                title: title.current.value,
                questions: questionListObject,
                owner: me.id
            })
            .then(response => {
                navigate("/");
                flash(6000, {type: "success", message: "Quizz créé avec succès"});
            })
            .catch(error => {
                console.error(error);
                flash(6000, {type: "error", message: "Une erreur est survenue"});
            });
    };
    return (
        <div>
            <h1>Question list</h1>
            <button onClick={() => addQuestion(incrementId())}>Ajouter une question</button>
            <form onSubmit={onFormSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>Question name</th>
                            <th>Question Asnwer</th>
                            <th>Good Answer</th>
                            <th>id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionList.map(question => <Question key={question.id} question={question} />)}
                    </tbody>
                </table>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default QuestionList;
