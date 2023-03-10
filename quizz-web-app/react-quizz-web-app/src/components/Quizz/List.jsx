import React from 'react';
import { Link } from 'react-router-dom';

function List({quizzList, noQuizz}) {
    return (
        <div>
            {noQuizz
                ? <p>
                    no quizz found: <Link to="/creation">create a new One ?</Link>
                </p>
                : <ul>
                    {quizzList.map(quizz =>
                        <li key={quizz.id}>
                            <Link to={`/quizz/${quizz.id}`} style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "60px"
                            }}>
                                {quizz.title}
                                <span>
                                    {quizz?.owner?.first_name} {quizz?.owner?.last_name}
                                </span>
                            </Link>
                        </li>
                    )}
                </ul>}
        </div>
    );
}

export default List;
