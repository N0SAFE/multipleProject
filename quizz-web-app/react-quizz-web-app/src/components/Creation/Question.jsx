import React, { useRef, useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

function Question({ question }) {
    const [proposition0, setProposition0] = useState(question.proposition0);
    const [proposition1, setProposition1] = useState(question.proposition1);
    const [proposition2, setProposition2] = useState(question.proposition2);
    const [proposition3, setProposition3] = useState(question.proposition3);

    const [items, setItems] = useState([]);

    const [datalistValue, setDatalistValue] = useState([question.answer]);

    useEffect(
        () => {
            setItems([
                { label: proposition0, value: 0 },
                { label: proposition1, value: 1 },
                { label: proposition2, value: 2 },
                { label: proposition3, value: 3 }
            ]);
            console.log(items);
        },
        [proposition0, proposition1, proposition2, proposition3]
    );
    
    return (
        <tr>
            <td>
                <input name={question.id + "-question"} defaultValue={question.question} />
            </td>
            <td style={{ display: "flex", flexDirection: "column" }}>
                <input onInput={e => setProposition0(e.target.value)} name={question.id + "-propositions-0"} defaultValue={question.proposition0} />
                <input onInput={e => setProposition1(e.target.value)} name={question.id + "-propositions-1"} defaultValue={question.proposition1} />
                <input onInput={e => setProposition2(e.target.value)} name={question.id + "-propositions-2"} defaultValue={question.proposition2} />
                <input onInput={e => setProposition3(e.target.value)} name={question.id + "-propositions-3"} defaultValue={question.proposition3} />
            </td>
            <td>
                <input type="hidden" value={datalistValue} name={question.id + "-answers"} />
                <Select onChange={items => setDatalistValue(items.map((item) => item.value))} closeMenuOnSelect={false} components={animatedComponents} isMulti options={items} />
            </td>
            <td>
                {question.id}
            </td>
        </tr>
    );
}

export default Question;
