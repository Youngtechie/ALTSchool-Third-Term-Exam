<script setup>
import { useRouter } from 'vue-router';
import RepoDetails from '../components/RepoDetails.vue'

const route = useRouter();
const name = route.currentRoute.value.params.repoName;

/***
This code imports the useRouter function from the Vue Router library and the RepoDetails component from a local file. It then calls the useRouter function to create a router instance and assigns it to the route variable. Finally, it gets the repoName parameter from the current route by accessing the params property of the currentRoute.value object and assigning it to the name variable.
***/
</script>
<template>
    <RepoDetails :name="name" />
<!--Render the RepoDetails component passing the name as a props to the component-->
</template>
<style scope></style>
