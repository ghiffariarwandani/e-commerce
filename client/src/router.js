import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import getAlbum from './views/Album-detail.vue'
import userProfile from './components/userProfile.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/albums',
      name: 'album',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "album" */ './views/Album.vue')
    },
    {
      path: '/album-detail/:id',
      name: 'album-detail',
      component: getAlbum
    },
    {
      path:'/login',
      name: 'login-form',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "login-form" */ './views/Login.vue')
    },
    {
      path:'/register',
      name: 'register-form',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "register-form" */ './views/Register.vue')
    },
    {
      path:'/cart',
      name: 'cart-list',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "cart" */ './views/Cart.vue')
    },
    {
      path:'/dashboard-user',
      name: 'dashboard-user',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "dashboardUser" */ './views/dashboard-user.vue'),
      children: 
      [
        {
          path: 'profile',
          component: userProfile
        }
      ]
    },
    {
      path:'/dashboard-admin',
      name: 'dashboard-admin',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "dashboardadmin" */ './views/dashboard-admin.vue')
    }
  ]
})