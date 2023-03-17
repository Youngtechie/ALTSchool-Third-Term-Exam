import { createRouter, createWebHistory } from 'vue-router'
import GithubRepos from '../components/GithubRepos.vue'
import ErrorPage from '../components/ErrorPage.vue'
import GithubHome from '../components/GithubHome.vue'
import EachRepo from '../components/EachRepo.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: GithubHome
    },
    {
      path: '/YoungTechie/Repositories',
      name: 'GithubRepos',
      component: GithubRepos
    },
    {
      path: '/YoungTechie/repo/:repoName',
      name: 'EachRepo',
      component: EachRepo,
    },
    { path: '/:catchAll(.*)*', redirect: '/'}
    ]
})

export default router
