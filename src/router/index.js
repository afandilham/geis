import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import InventoryData from '../views/master/InventoryData.vue'
import UserData from '../views/master/UserData.vue'
import InOutItem from '../views/InOutItem.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Beranda',
    component: Dashboard
  },
  {
    path: '/inventory',
    name: 'Data Barang',
    component: InventoryData
  },
  {
    path: '/user',
    name: 'Data User',
    component: UserData
  },
  {
    path: '/in-out-item',
    name: 'Barang diterima',
    component: InOutItem
  },
  {
    path: '/reports',
    name: 'Laporan',
    component: () => import('../views/Reports.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
