<template>
    <div class="main">
        <button @click="startFunc">Start!</button>
        <div class="section">
            <div class="blue box"></div>
            <div class="red box"></div>
            <div class="yellow box"></div>
            <div class="green box"></div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { usePuzzle } from "../composables/usePuzzle";
const {
    startFunctions,
    // stopFunc
} = usePuzzle();

onMounted(() => {
    // startFunctions();
    console.log("hey");
});
const startFunc = async () => {
    startFunctions();
};
</script>

<style scoped>
.main {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.section {
    display: grid;
    width: fit-content;
    margin: 5rem auto;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
    visibility: hidden;
}

.box {
    width: 100%;
    height: 100%;
    opacity: 0;
    width: 600px;
    height: 600px;
}
.blue {
    background: blue;
}
.red {
    background: red;
}
.yellow {
    background: yellow;
}
.green {
    background: green;
}
</style>
