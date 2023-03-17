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
    { path: '/404', name: 'page-no-found', component: ErrorPage},
    { path: '/:catchAll(.*)', redirect: '/404'}
    ]
})

export default router
// Import the necessary functions from the Vue Router library and the components to be used in the routes
import { createRouter, createWebHistory } from 'vue-router'
import GithubRepos from '../components/GithubRepos.vue'
import ErrorPage from '../components/ErrorPage.vue'
import GithubHome from '../components/GithubHome.vue'
import EachRepo from '../components/EachRepo.vue'

// Create a new router instance with the specified options
const router = createRouter({
  // Use the HTML5 history API for clean URLs
  history: createWebHistory(),
  // Define the routes for the application
  routes: [
    // Define the route for the home page
    {
      path: '/',
      name: 'Home',
      component: GithubHome
    },
    // Define the route for the user's repositories page
    {
      path: '/YoungTechie/Repositories',
      name: 'GithubRepos',
      component: GithubRepos
    },
    // Define the route for an individual repository page
    {
      path: '/YoungTechie/repo/:repoName',
      name: 'EachRepo',
      component: EachRepo,
    },
    // Define the route for the error page
    { path: '/404', name: 'page-no-found', component: ErrorPage},
    // Redirect all other routes to the 404 page
    { path: '/:catchAll(.*)', redirect: '/404'}
  ]
})

// Export the router instance to be used in the Vue app
export default router
