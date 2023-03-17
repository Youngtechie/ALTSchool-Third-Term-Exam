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
                        {{ Prevbtn }}
                    </button>
                </li>
                <li v-for="btn in Editbtns" :key="btn">
                    <button @click="changePage(btn)" :class="[{ isDark: store.isDark }, { isLight: !store.isDark }]">
                        {{ btn }}
                    </button>
                </li>
                <li v-if="currentPosition < displayed.length" :class="{ next: true }"><button @click="Next"
                        :class="[{ isDark: store.isDark }, { isLight: !store.isDark }]">{{ Nextbtn }}</button>
                </li>
            </ul>
        </section>

        <RouterLink to="/"><button :class="{ isDark: store.isDark }">Go Home</button></RouterLink>
    </section>
    <!--
This component is rendering a list of repositories, with pagination functionality.
The template is using conditional rendering with v-if to check whether there are any repositories to load.
If there are no repositories (Repos.length === 0), then the component is rendering a LoadingRepos component.
If there are repositories to load, then the component is rendering the list of repositories and pagination controls.
The v-for directive is being used to iterate over the displayed array of repositories, which is determined by the current pagination position (currentPosition).
The template is also using RouterLink to create links to the repository pages, as well as a "Go Home" button that links to the home page.
-->
</template>
<script setup>
// Import the LoadingRepos component and various Vue functions and hooks
import LoadingRepos from './LoadingRepos.vue';
import { ref, watchEffect, onUnmounted, onMounted, onUpdated } from 'vue'
import { RouterLink } from 'vue-router';
import { useThemeStore } from '../stores/theme';

// Access the theme store
const store = useThemeStore()

// Initialize variables
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

// Watch for changes in the data from the API
watchEffect(async () => {
    const res = await fetch('https://api.github.com/users/Youngtechie/repos')
    datas.value = await res.json()
})

// Function to change the current page number
const changePage = (n) => {
    currentPosition.value = n
    //set currentPosition value to n
    posts.value.forEach((post) => {
        post.removeAttribute('id')
        if (post.innerHTML === `${ n }`) {
        post.setAttribute("id", 'activePage') // give the current and active post the attribute (id, activePage)
        }
    })
}

// Update the active page number on page update
onUpdated(() => {
    posts.value = document.querySelectorAll('.pagination ul li button')
    posts.value.forEach((post) => {
        post.removeAttribute('id')
        if (post.innerText === `${ currentPosition.value }`) {
        post.setAttribute("id", 'activePage')
    }
})
})

// Function to move to the next page
const Next = () => {
    if (currentPosition.value < displayed.value.length + 1) {
        currentPosition.value += 1
        //Add one from the currentposition value
    }
    if (currentPosition.value > 3 && currentPosition.value < btns.value.length + 1) {
        //if currentposition value is great than 3 and currentposition is less than the number of the btns present.
        Editbtns.value.forEach((btn, index) => {
            btn = btn + 1 //Add one to the present element in editbtns
            Editbtns.value.splice(index, 1, btn) // then replace the previous btn starting from index of the btn with the new btn
        })
    }
}

// Function to move to the previous page
const Prev = () => {
    if (currentPosition.value < displayed.value.length + 1 && currentPosition.value > 1) {
        currentPosition.value -= 1
        //subtract one from the currentposition value
    }
    if (Editbtns.value[0] !== 1) {
        //if editbtns first element is not 0
        Editbtns.value.forEach((btn, index) => {
            btn = btn - 1 //subtract one from the present element in editbtns
            Editbtns.value.splice(index, 1, btn) // then replace the previous btn starting from index of the btn with the new btn
        })
    }
}

// Fetch data from the API and initialize variables on component mount
onMounted(() => {
    console.log()
    id = setTimeout(() => {
        if (datas.value !== null) {
            Repos.value = [...datas.value]
            Splice.value = [...Repos.value] //Duplicate the original repos container
            length.value = Repos.value.length //Length of the total repos fetched
            positions.value = Math.ceil(length.value / neededLength.value) // Length / 5, five repos is needed in each page
            for (let i = 0; i < positions.value; i++) {
                displayed.value.push(Splice.value.splice(0, 5))
                btns.value.push(i + 1)
                if (i < 3) {
                    Editbtns.value.push(i + 1)
                    continue
                }
            }
            //The above loop is get the specific number of repos to be displayed into the displayed value
            //at the same time, push the iterate value + 1 into btns which serve as the container of the numbers to be clicked.
            //Editbtns value is actually the accepted values to be presented after the prev btn and before the next btn.(Just 3 numbers are accepted)
        }
    }, 3000)
})

// Clear the timeout on component unmount
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

.isLight {
    border: 2px solid black;
}

.isLight:hover {
    background-color: black;
    color: white;
}

#activePage {
    background-color: blue;
    color: white;
}</style>
