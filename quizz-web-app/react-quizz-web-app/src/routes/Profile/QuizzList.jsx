import React from 'react';
import { useDirectus } from 'react-directus';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

function QuizzList(){
    const { me } = useAuth();
    const [quizz, setQuizz] = useState([]);
    const { directus } = useDirectus();
    useEffect(() => {
        directus.items("quizz").readByQuery(
            {
                fields: ["id", "title", "description", "questions.question", "questions.proposition", "questions.id"],
                
            }
        ).then(response => {
            setQuizz(response);
        });
    }, []);
    return (
        <div>
            <h1>Quizz list</h1>
            <div>
                {JSON.stringify(quizz)}
            </div>
        </div>
    );
}

export default QuizzList;