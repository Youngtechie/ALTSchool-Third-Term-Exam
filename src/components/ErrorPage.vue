<template>
    <section className="errorPage">
            <section className='error'><span>404</span> <span>error</span></section>

            <section className='pageE'>This page doesn't exist</section>

            <RouterLink to="/"><button :class="{ isDark: store.isDark }">Go Home</button></RouterLink>
    </section>
</template>
<script setup>
import { RouterLink } from 'vue-router';
import { useThemeStore } from '../stores/theme';
const store = useThemeStore()
</script>
<style scoped>
.errorPage{
    height: 100vh;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    font-family: cursive;
}
.error{
    font-size: 50px;
}
.pageE{
    margin-bottom: 50px;
}
</style>
