import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: RegisterView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requerAutenticacao: true } // Marca que precisa estar logado
    }
  ]
})

// Trava de Segurança: verifica antes de ir para qualquer tela
router.beforeEach((to, from, next) => {
  const estaLogado = localStorage.getItem('usuarioLogado')

  // Se a rota precisa de login e a pessoa NÃO está logada
  if (to.meta.requerAutenticacao && !estaLogado) {
    alert('Você precisa fazer login para acessar esta página!')
    next('/') // Manda de volta para a tela de login
  } else {
    next() // Libera a navegação
  }
})

export default router