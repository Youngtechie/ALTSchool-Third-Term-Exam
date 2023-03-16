<template>
    <LoadingRepos v-if="Repos.length === 0" />
    <section v-else :class="{ container: true }">
        <ul :class="{ Repocontainer: true }">
            <li v-for="repo in displayed[currentPosition - 1]" :key="repo.id">
                <RouterLink :to="{ path: `/YoungTechie/repo/${repo.name}`, params: true }">
                    <button :class="{ isDark: store.isDark }">{{ repo.name.toUpperCase() }}</button>
                </RouterLink>
            </li>
        </ul>

        <section :class="{ pagination: true }">
            <ul>
                <li v-if="currentPosition > 1" :class="{ prev: true }">
                    <button @click="Prev" :class="[{ isDark: store.isDark }, { isLight: !store.isDark }]">
                        {{Prevbtn}}
                    </button>
                </li>
                <li v-for="btn in Editbtns" :key="btn">
                    <button @click="changePage(btn)" :class="[{ isDark: store.isDark }, { isLight: !store.isDark }]">
                        {{ btn }}
                    </button>
                </li>
                <li v-if="currentPosition < displayed.length" :class="{ next: true }"><button @click="Next"
                        :class="[{ isDark: store.isDark }, { isLight: !store.isDark }]">{{Nextbtn}}</button>
                </li>
            </ul>
        </section>

        <RouterLink to="/"><button :class="{ isDark: store.isDark }">Go Home</button></RouterLink>
    </section>
</template>
<script setup>
import LoadingRepos from './LoadingRepos.vue';
import { ref, watchEffect, onUnmounted, onMounted, onUpdated } from 'vue'
import { RouterLink } from 'vue-router';
import { useThemeStore } from '../stores/theme';

const store = useThemeStore()

let id;
const posts = ref(null)
const length = ref(0)
const neededLength = ref(5)
const positions = ref(0)
const currentPosition = ref(1)
const datas = ref(null)
const Repos = ref([])
const Splice = ref([])
const displayed = ref([])
const btns = ref([])
const Editbtns = ref([])
const Prevbtn = '<'
const Nextbtn = '>'

watchEffect(async () => {
    const res = await fetch('https://api.github.com/users/Youngtechie/repos')
    datas.value = await res.json()
})



const changePage = (n) => {
    currentPosition.value = n
    posts.value.forEach((post) => {
        post.removeAttribute('id')
        if (post.innerHTML === `${n}`) {
            post.setAttribute("id", 'activePage')
        }
    })
}

onUpdated(() => {
    posts.value = document.querySelectorAll('.pagination ul li button')
    posts.value.forEach((post) => {
        post.removeAttribute('id')
        if (post.innerText === `${currentPosition.value}`) {
            post.setAttribute("id", 'activePage')
        }
    })
})

const Next = () => {
    if (currentPosition.value < displayed.value.length + 1) {
        currentPosition.value += 1
    }
    if (currentPosition.value > 3 && currentPosition.value < btns.value.length + 1) {
        Editbtns.value.forEach((btn, index) => {
            btn = btn + 1
            Editbtns.value.splice(index, 1, btn)
        })
    }
}
const Prev = () => {
    if (currentPosition.value < displayed.value.length + 1 && currentPosition.value > 1) {
        currentPosition.value -= 1
    }
    if (Editbtns.value[0] !== 1) {
        Editbtns.value.forEach((btn, index) => {
            btn = btn - 1
            Editbtns.value.splice(index, 1, btn)
        })
    }
}

onMounted(() => {
    console.log()
    id = setTimeout(() => {
        if (datas.value !== null) {
            Repos.value = [...datas.value]
            Splice.value = [...Repos.value]
            length.value = Repos.value.length
            positions.value = Math.ceil(length.value / neededLength.value)
            for (let i = 0; i < positions.value; i++) {
                displayed.value.push(Splice.value.splice(0, 5))
                btns.value.push(i + 1)
                if (i < 3) {
                    Editbtns.value.push(i + 1)
                    continue
                }
            }
        }
    }, 3000)
})

onUnmounted(() => clearTimeout(id))

</script>
<style scoped>
.container,
ul,
.Repocontainer li,
.Repocontainer li a,
.Repocontainer li a button,
.pagination {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.container {
    height: 100vh;
    width: 320px;
}

.Repocontainer {
    height: 350px;
    width: 100%;
}

.Repocontainer li {
    height: 20%;
    width: 100%;
}

.Repocontainer li a,
.Repocontainer li a button {
    height: 90%;
    width: 90%;
}

.pagination {
    width: 90%;
    height: 35px;
    margin: 20px 0;
}

.pagination ul {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    height: 100%;
}

.pagination ul li {
    width: 20%;
    height: 100%;
}

.pagination ul li button {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 10px;
    font-weight: 700;
}
.isLight{
    border: 2px solid black;
}
.isLight:hover{
    background-color: black;
    color: white;
}

#activePage {
    background-color:blue;
    color: white;
}
</style>