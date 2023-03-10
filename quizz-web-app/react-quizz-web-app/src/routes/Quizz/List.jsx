import { useDirectus } from "react-directus";
import { useState, useEffect } from "react";
import List from "../../components/Quizz/List.jsx";

function Quizz() {
    const { directus } = useDirectus();
    const [quizzList, setQuizzList] = useState([]);
    const [noQuizz, setNoQuizz] = useState(false);

    useEffect(() => {
        directus.items("quizz").readByQuery({ sort: ["id"], fields: ["id", "title", "owner.first_name", "owner.last_name"] }).then(response => {
            setQuizzList(response.data);
            if (response.data.length === 0) {
                setNoQuizz(true);
            }
        });
    }, []);

    return (
        <div>
            <h1>Quizz</h1>
            <List quizzList={quizzList} noQuizz={noQuizz} />
        </div>
    );
}

export default Quizz;
