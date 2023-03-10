<template>
    <tr>
        <td>
            <input :name="question.id + '-question'" :value="question.question" />
        </td>
        <td>
            <input v-bind:key="index" v-for="(proposition, index) in propositions" v-model="propositions[index]" />
        </td>
        <td>
            <Multiselect v-model="value" :options="options" :multiple="true" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></Multiselect>
        </td>
    </tr>
</template>

<script setup>
    import { reactive, ref } from "vue";
    import Multiselect from "vue-multiselect";
    const { question } = defineProps({
        question: Object
    });
    const selectValue = ref([...question.answers]);
    const propositions = reactive([...question.propositions]);
    const value = ref("")
    const options = ref(['Select option', 'options', 'selected', 'multiple', 'label', 'searchable', 'clearOnSelect', 'hideSelected', 'maxHeight', 'allowEmpty', 'showLabels', 'onChange', 'touched'])
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
