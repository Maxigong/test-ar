<template>
    <button v-if="showButton" @click="startFunc">Start!</button>
    <div class="model-container"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useModel } from "../composables/useModel";
const {
    startFunctions,
    // stopFunc
} = useModel();

const showButton = ref(true);
onMounted(() => {
    // startFunctions();
    console.log("hey");
});
const startFunc = async () => {
    showButton.value = false;
    startFunctions();
};
</script>

<style scoped>
.model-container {
    position: relative;
    width: 100vw;
    height: 90vh;
    overflow: hidden;
}
</style>
