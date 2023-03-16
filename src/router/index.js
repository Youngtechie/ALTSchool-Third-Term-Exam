import { createRouter, createWebHistory } from 'vue-router'
import GithubRepos from '../components/GithubRepos.vue'
import ErrorPage from '../components/ErrorPage.vue'
import GithubHome from '../components/GithubHome.vue'
import EachRepo from '../components/EachRepo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
    {
      path: '/404',
      name: 'ErrorPage',
      component: ErrorPage
    },
    {
      path: '/:catchAll(.*)',
      redirect: '404'
    }
  ]
})

export default router
