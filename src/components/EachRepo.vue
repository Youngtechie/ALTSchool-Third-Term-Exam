<script setup>
import { useRouter } from 'vue-router';
import RepoDetails from '../components/RepoDetails.vue'
const route = useRouter()
const name = route.currentRoute.value.params.repoName
</script>
<template>
    <RepoDetails :name="name" />
</template>
<style scope></style>