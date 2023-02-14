<template>
    <button v-if="showButton" @click="startFunc">Start!</button>
    <button v-if="showButton" @click="clearData">Clear data</button>
    <div class="puzzle-container">
        <div class="section">
            <div class="blue box"></div>
            <div class="red box"></div>
            <div class="yellow box"></div>
            <div class="green box"></div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { usePuzzle } from "../composables/usePuzzle";
const {
    startFunctions,
    // stopFunc
} = usePuzzle();

const showButton = ref(true);
onMounted(() => {
    // startFunctions();
    console.log("hey");
});
const startFunc = async () => {
    showButton.value = false;
    startFunctions();
};
const clearData = async () => {
    localStorage.removeItem("itemsFound");
};
</script>

<style scoped>
.puzzle-container {
    position: relative;
    width: 100vw;
    height: 90vh;
    overflow: hidden;
}

.section {
    display: grid;
    width: fit-content;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    width: 1200px;
    height: 1200px;
    background: url("https://cdn.britannica.com/42/91642-050-332E5C66/Keukenhof-Gardens-Lisse-Netherlands.jpg")
        center/cover no-repeat;
}

.box {
    width: 100%;
    height: 100%;
    opacity: 1;
    width: 600px;
    height: 600px;
    background: black;
}
</style>
