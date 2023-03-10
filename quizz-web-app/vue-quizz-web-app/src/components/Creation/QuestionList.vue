<template>
    <div>
        <h1>Question list</h1>
        <button
            @click="
                () => {
                    addQuestion(incrementId());
                }
            "
        >
            Ajouter une question
        </button>
        <form @submit="onFormSubmit">
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
                    <Question v-for="question in questionList" v-bind:key="question.id" :question="question"></Question>
                </tbody>
            </table>
        </form>
    </div>
</template>

<script setup>
    import { inject, ref } from "vue";
    import { useDirectus } from "vue-directus";
    import { useRouter } from "vue-router";
    import Question from "./Question.vue";
    const router = useRouter();
    const directus = useDirectus();
    const me = inject("me");
    const questionList =  ref([])
    let id = 0;
    
    const {title} = defineProps({
        title: String
    })
    
    const incrementId = () => {
        return id++;
    };
    const addQuestion = (id) => {
        questionList.value = [...questionList.value, { id, question: "", answers: [], propositions: ["", "", "", ""] }];
    };
    const onFormSubmit = (e) => {
        e.preventDefault();
        const questionMapped = Array.from(e.target.elements)
            .filter((element) => element.name !== "")
            .map((element) => {
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
            if (question.type === "proposition") {
                if (acc[question.id][question.type] === undefined) {
                    acc[question.id][question.type] = [];
                }
                acc[question.id][question.type][question.index] = question.value;
                return acc;
            }
            if (question.type === "answers") {
                question.value = question.value.split(",").map((value) => parseInt(value));
            }
            acc[question.id][question.type] = question.value;
            return acc;
        }, []);

        console.log(questionListObject);
        console.log(title);
        console.log(me);
    };
</script>
