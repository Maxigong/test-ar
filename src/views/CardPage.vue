<template>
    <div class="main">
        <button @click="startFunc">Start</button>
        <CardTest />
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import CardTest from "../components/CardTest.vue";
import { useMindArtCard } from "../composables/useMindArCard";
const { startFunctions } = useMindArtCard();
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
</style>
