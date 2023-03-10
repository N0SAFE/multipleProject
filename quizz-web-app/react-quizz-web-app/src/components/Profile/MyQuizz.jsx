import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDirectus } from 'react-directus';
import List from '../Quizz/List.jsx';

function MyQuizz({user}){
    
    const { directus } = useDirectus();
    const [myQuizz, setMyQuizz] = useState([])
    useEffect(() => {
        console.log(user)
        directus.items("quizz").readByQuery(
            {
                fields: ["id", "title"],
                filter: {
                    owner: {
                        _eq: user.id
                    }
                }
            }
        ).then(response => {
            setMyQuizz(response.data);
            console.log("response.data", response.data);
        });
    }, []);
    
    return (
        <div>
            <h1>My Quizz</h1>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <List quizzList={myQuizz} />
            </div>
            <Link to="/quizz/creation">Creation</Link>
        </div>
    )
}

export default MyQuizz;