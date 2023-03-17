<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from 'vue';
import LoadingRepos from './LoadingRepos.vue';
import { useThemeStore } from '../stores/theme';

// Get a reference to the theme store
const store = useThemeStore();

import { RouterLink } from 'vue-router';

let id;

// Define reactive references to hold data
const datas = ref(null);
const Repos = ref(null);

// Define the props for the component
const props = defineProps(['name']);

// Watch for changes to the props and make an API call to fetch data
watchEffect(async () => {
  const res = await fetch(`https://api.github.com/repos/Youngtechie/${props.name}`);
  datas.value = await res.json();
});

// When the component is mounted, set a timeout to update the data after 3 seconds
onMounted(() => {
  id = setTimeout(() => {
    if (datas.value !== null) {
      Repos.value = datas.value;
    }
  }, 3000);
});

// When the component is unmounted, clear the timeout
onUnmounted(() => clearTimeout(id));

</script>
<template>
    <LoadingRepos v-if="Repos === null" />
    <section :class="{repoDetails: true}" v-else>
        <section :class="{header: true }">
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"
                class="octicon octicon-repo color-fg-muted mr-2">
                <path :fill="store.color"
                    d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z">
                </path>
            </svg>
            <pre>{{ name.toLocaleUpperCase() }}</pre>
        </section>

        <section :class="{ arrange: true }">
            <section :class="[{ btnLike: true }, { isDark: store.isDark }]">
                <pre>Login: {{ Repos.owner.login }}</pre>
            </section>
            <section v-if="Repos.description !== null">
                {{ Repos.description }}
            </section>
        </section>


        <section :class="{ arrange: true }">
            <section :class="{ arrangeRow: true }">
                <section :class="[{ btnLike: true }, { isDark: store.isDark }]">
                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                        data-view-component="true" class="octicon octicon-repo-forked mr-2">
                        <path :fill="store.color"
                            d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z">
                        </path>
                    </svg>
                    <pre>{{ Repos.forks }} Forks</pre>
                </section>
                <section :class="[{ btnLike: true }, { isDark: store.isDark }]">
                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                        data-view-component="true" class="octicon octicon-eye">
                        <path :fill="store.color"
                            d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z">
                        </path>
                    </svg>
                    <pre>{{ Repos.watchers }} watching</pre>
                </section>
            </section>
            <section>
                <pre> Main Branch : {{ Repos.default_branch }}</pre>
            </section>

        </section>

        <section :class="{ arrange: true }">

            <section :class="[{ btnLike: true }, { isDark: store.isDark }]">
                <pre>Created: {{ new Date(Repos.created_at).toUTCString() }}</pre>
            </section>
            <section :class="[{ btnLike: true }, { isDark: store.isDark }]">
                <pre>Pushed: {{ new Date(Repos.pushed_at).toUTCString() }}</pre>
            </section>
            <section :class="[{ btnLike: true }, { isDark: store.isDark }]">
                <pre>Updated: {{ new Date(Repos.updated_at).toUTCString() }}</pre>
            </section>
        </section>

        <section :class="{ arrange: true }">
            <section v-if="Repos.license !== null" :class="[{ btnLike: true }, { isDark: store.isDark }]">
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"
                    class="octicon octicon-law mr-2">
                    <path :fill="store.color"
                        d="M8.75.75V2h.985c.304 0 .603.08.867.231l1.29.736c.038.022.08.033.124.033h2.234a.75.75 0 0 1 0 1.5h-.427l2.111 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.006.005-.01.01-.045.04c-.21.176-.441.327-.686.45C14.556 10.78 13.88 11 13 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L12.178 4.5h-.162c-.305 0-.604-.079-.868-.231l-1.29-.736a.245.245 0 0 0-.124-.033H8.75V13h2.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h2.5V3.5h-.984a.245.245 0 0 0-.124.033l-1.289.737c-.265.15-.564.23-.869.23h-.162l2.112 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.016.015-.045.04c-.21.176-.441.327-.686.45C4.556 10.78 3.88 11 3 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L2.178 4.5H1.75a.75.75 0 0 1 0-1.5h2.234a.249.249 0 0 0 .125-.033l1.288-.737c.265-.15.564-.23.869-.23h.984V.75a.75.75 0 0 1 1.5 0Zm2.945 8.477c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327Zm-10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327Z">
                    </path>
                </svg>
                <pre>License: {{ Repos.license.name }}</pre>
            </section>
            <section>
                <a :href="Repos.html_url" target="_blank">
                    <button type="button" :class="{ isDark: store.isDark }">
                        View On Github
                    </button>
                </a>
            </section>
        </section>

        <section :class="{ prevLink: true }">
            <RouterLink to="/"><button :class="{ isDark: store.isDark }">Go Home</button></RouterLink>
            <RouterLink to="/YoungTechie/Repositories"><button :class="{ isDark: store.isDark }">Views Repositories</button>
            </RouterLink>
        </section>

    </section>
</template>
<style>
.repoDetails{
    display: flex;
    flex-flow: column wrap;
    height: 100vh;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.header {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    width: 300px;
}

pre {
    font-weight: 900;
}

svg {
    margin-right: 10px;
}
.arrange {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}

.arrangeRow {
    display: flex;
    flex-wrap: row wrap;
    justify-content: space-between;
    width: 304px;
}

.arrangeRow section {
    width: 50%;
}

.btnLike {
    margin-bottom: 10px;
}

.btnLike svg {
    margin-right: 10px;
}

.arrange:last-of-type {
    margin-top: 0;
}

.arrange:last-of-type .btnLike {
    margin-bottom: 20px;
    margin-top: 10px;
}

.prevLink {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-around;
    margin-top: 10px;
}

.prevLink a {
    width: 140px;
}

.prevLink a button {
    width: 100%;
}
</style>
