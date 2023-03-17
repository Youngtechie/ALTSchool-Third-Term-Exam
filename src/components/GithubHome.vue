<template>
    <loading-repos v-if="user === null" />
    <section v-else :class="{ githubHome: true }">
        <section  :class="{ home: true }">
            <section :class="{ aboutMe: true }">
                <section :class="[{ avatar: !store.isDark }, {avatarDark: store.isDark}]">
                    <img :src="user.avatar_url" alt="Youngtechie_avatar" />
                </section>
                <h4>{{ user.name }} ({{ user.login }})</h4>
                <section :class="{ heading: true }">
                    <p>{{ user.bio }}</p>
                </section>
                <section :class="{ heading: true }">
                    <svg class="octicon octicon-location" viewBox="0 0 16 16" version="1.1" width="16" height="16"
                        aria-hidden="true">
                        <path :fill="store.color"
                            d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z">
                        </path>
                    </svg>
                    <p>{{ user.location }}</p>
                </section>
            </section>

            <section :class="{ follow: true }">
                <svg text="muted" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                    data-view-component="true" class="octicon octicon-people">
                    <path :fill="store.color"
                        d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z">
                    </path>
                </svg>
                <span>{{ user.followers }} followers</span>
                <span :class="{ divide: true }">||</span>
                <span>{{ user.following }} following</span>
            </section>

            <section :class="{ Linking: true }">
                <RouterLink to="/YoungTechie/Repositories">
                    <button :class="{ isDark: store.isDark }">
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                            data-view-component="true" class="octicon octicon-repo UnderlineNav-octicon hide-sm">
                            <path :fill="store.color"
                                d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z">
                            </path>
                        </svg>
                        Public Repositories: {{ user.public_repos }}
                    </button>
                </RouterLink>
            </section>

            <section :class="{ contact: true }">
                <a :href="twitterUrl" :class="{ twitUrl: true }" target="_blank">
                    <button :class="{ isDark: store.isDark }">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 273.5 222.3" role="img"
                            aria-labelledby="7s9on67a5kz2aow83tns90c95cutce7" class="octicon" height="16" width="16">
                            <title id="7s9on67a5kz2aow83tns90c95cutce7">Twitter</title>
                            <path
                                d="M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1"
                                :fill="store.color"></path>
                        </svg>
                        {{ user.twitter_username !== null ? "@" + user.twitter_username : '@OlaegbeOlamile' }}
                    </button>
                </a>
                <a href="mailto:youngtechie0@gmail.com" :class="{ gmailUrl: true }" target="_blank">
                    <button :class="{ isDark: store.isDark }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 193">
                            <path :fill="store.color"
                                d="M58.182 192.05V93.14L27.507 65.077L0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455h40.727Z" />
                            <path :fill="store.color"
                                d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837l-27.026 25.798v98.91Z" />
                            <path :fill="store.color"
                                d="m58.182 93.14l-4.174-38.647l4.174-36.989L128 69.868l69.818-52.364l4.669 34.992l-4.669 40.644L128 145.504z" />
                            <path :fill="store.color"
                                d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945l-16.292 12.218Z" />
                            <path :fill="store.color"
                                d="m0 49.504l26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23v23.273Z" />
                        </svg>
                        {{ user.email !== null ? user.email : 'Youngtechie0@gmail.com' }}
                    </button>
                </a>
            </section>


            <a :href="[user.html_url]" :class="{ myPage: true }" target="_blank">
                <button :class="{ isDark: store.isDark }">View
                    My Github Page
                </button>
            </a>
        </section>

    </section>

<!--
This is a piece of Vue.js code that displays information about a GitHub user's profile.
Here's what the code does:
It uses a custom component called "loading-repos" that displays a loading animation while the user's information is being fetched. 
This component is only shown when the "user" variable is null.
Once the user's information is available (i.e., when "user" is not null), the component shows several sections with different classes that define their styling. 
These sections display the user's profile picture, name, bio, location, number of followers and following, and the number of public repositories they have.
The final section includes a button that links to the user's GitHub page.
-->
</template>
<script setup>
// Import Vue modules
import { ref, watchEffect, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router';

// Import components
import LoadingRepos from './LoadingRepos.vue';

// Import store
import { useThemeStore } from '../stores/theme';

// Declare variables
let id;
let twitterUrl;

// Create refs
const datas = ref(null)
const user = ref(null)

// Get store instance
const store = useThemeStore()

// Fetch user data from GitHub API
watchEffect(async () => {
    const res = await fetch("https://api.github.com/users/Youngtechie")
    datas.value = await res.json()
})

// Set user data and Twitter URL when component is mounted
onMounted(() => {
    id = setTimeout(() => {
        if (datas.value !== null) {
            user.value = datas.value
            twitterUrl = `https://twitter.com/${user.value.twitter_username}`
        }
    }, 3000)
})

// Clear timeout when component is unmounted
onUnmounted(() => clearTimeout(id))

</script>
<style scoped>
.githubHome,
home {
    width: 95%;
    height: 100vh;
    text-align: center;
}

.avatar, .avatarDark {
    height: 150px;
    width: 100%;
}

.avatar img, .avatarDark img {
    width: 150px;
    height: 100%;
    border-radius: 50%;
}
.avatarDark img{
    border: 2px solid #fff;
}
.avatar img{
    border: 2px solid #1c1c1c;
}

.aboutMe {
    display: flex;
    flex-flow: column wrap;
    margin-top: 20px;
}

.aboutMe h4 {
    font-weight: 900;
    font-size: large;
    margin: 10px 0;
}

.aboutMe .heading {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
}

.heading svg {
    margin-right: 5px;
}

.follow {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
}

.follow span {
    margin-left: 10px;
}

.follow .divide {
    font-weight: 900;
}

.contact svg,
.Linking svg {
    margin-right: 10px;
}

.githubHome .contact {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    margin: 20px 0;
    width: 300px;
}

.twitUrl {
    align-self: flex-start;
    margin-bottom: 10px;
}

.gmailUrl {
    align-self: flex-end;
}

.githubHome,
.avatar,
.Linking,
.home, .avatarDark {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
}
</style>
