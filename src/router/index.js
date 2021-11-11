import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home'
import StatisticPage from '../views/StatisticPage'
import DetailsPage from '../views/DetailsPage'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        //path: '/statistic/:data',
        path: '/statistic',
        name: 'StatisticPage',
        component: StatisticPage
    },
    {
        //path: '/details/:data',
        path: '/details',
        name: 'DetailsPage',
        component: DetailsPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router