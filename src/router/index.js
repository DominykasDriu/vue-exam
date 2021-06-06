import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Create from '../views/Create.vue'
import Edit from '../views/Edit.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Post from '../views/Post.vue'
import UserPosts from '../views/UserPosts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/edit/:name/:id',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/post/:name/:id',
    name: 'Post',
    component: Post
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/user_posts/:name',
    name: 'UserPosts',
    component: UserPosts
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
