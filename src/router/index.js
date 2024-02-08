import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import { LoginCallback, navigationGuard } from '@okta/okta-vue'
//import Login from '@/views/Login.vue'
import Login from "@/components/forms/Login.vue";
import Profile from '@/views/Profile.vue'
import AboutView from "@/views/AboutView.vue";
import HouseItems from "@/components/house/HouseItems.vue";
import OptionsMenu from "@/components/OptionsMenu.vue";
import Owner from "@/components/owner/Owner.vue";
import Register from "@/components/forms/Register.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Profile
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: AboutView
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/login/callback',
            component: Login
        },
        {
            path: '/options',
            component: OptionsMenu
        },
        {
            path: '/houses',
            component: HouseItems
        },
        ,
        {
            path: '/register',
            component: Register
        },
        {
            path: '/owner',
            component: Owner
        },
        ,
        {
            path: '/owner/:id',
            component: Owner
        },
        {
            path: '/profile',
            component: Profile,
            meta: {
                requiresAuth: true
            }
        },
    ]
})

router.beforeEach(navigationGuard)

export default router