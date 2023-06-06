import { createRouter, createWebHistory } from 'vue-router'
import OnnxView from '../views/OnnxView.vue'
import login from '../views/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name: 'login',
      component: login,
      
    },
    {
      path: '/index',
      name: 'onnx',
      component: OnnxView
    }
    
  ]
})
router.beforeEach(function(to, from, next) {
  const pathArr=['/index']
  if (pathArr.indexOf(to.path) !== -1) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})
export default router
