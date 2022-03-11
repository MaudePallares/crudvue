import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Agregar from '../components/agregar.vue'
import EditarD from '../components/EditarD.vue'
import MostrarD from '../components/MostrarD.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: HomeView
  },
  {
    path: '/mostraD',
    name: 'mostrarD',
    component: MostrarD
  },
  {
    path: '/EditarD/:id',
    name: 'EditarD',
    component: EditarD
  },
  {
    path: '/agregar',
    name: 'agregar',
    component: Agregar
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
