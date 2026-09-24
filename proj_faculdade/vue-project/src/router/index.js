import { createRouter, createWebHistory } from 'vue-router'
import InitView from '../views/InitView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'init',
      component: () => import('../views/InitView.vue'),
      meta: { requerAutenticacao: false } // A tela inicial não precisa de login
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requerAutenticacao: true } // Marca que a Home precisa de login
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')      
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: () => import('../views/RegisterView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
     const usuarioLogado = localStorage.getItem('usuarioLogado')

  // Se a rota exige autenticação e o utilizador NÃO está logado
  if (to.meta.requerAutenticacao && !usuarioLogado) {
    next('/login') // Redireciona para a tela de login
  } 
  // Se o utilizador já está logado e tenta ir para a tela de login ou inicial
  else if (usuarioLogado && (to.path === '/login' || to.path === '/init')) {
    next('/home')
  } 
  // Em qualquer outro caso, deixa navegar normalmente
  else {
    next()
  }
})

export default router