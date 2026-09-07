<template>
  <div class="login-container">
    <main class="login-card">
      <h2>Acessar o Portal </h2>

    <form @submit.prevent="fazerLogin">
      <div style="margin-bottom: 15px;">
        <label style="display: block;">E-mail:</label>
        <input 
          type="email" 
          v-model="email" 
          placeholder="admin@cidade.com" 
          required 
          style="width: 100%; padding: 8px;" 
        />
      </div>

      <div style="margin-bottom: 15px;">
        <label style="display: block;">Senha:</label>
        <input 
          type="password" 
          v-model="senha" 
          placeholder="123456" 
          required 
          style="width: 100%; padding: 8px;" 
        />
      </div>

      <button type="submit" style="padding: 10px 20px; cursor: pointer;">Entrar</button>
    </form>

    <p style="margin-top: 20px;">
      Não tem conta? <router-link to="/cadastro">Cadastre-se aqui</router-link>
    </p>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const senha = ref('')

function fazerLogin() {
  // Limpa possíveis espaços digitados sem querer
  const emailDigitado = String(email.value).trim().toLowerCase()
  const senhaDigitada = String(senha.value).trim()

  const EMAIL_CORRETO = 'admin@cidade.com'
  const SENHA_CORRETA = '123456'

  // Confirmação direta
  if (emailDigitado === EMAIL_CORRETO && senhaDigitada === SENHA_CORRETA) {
    localStorage.setItem('usuarioLogado', 'true')
    alert('Login realizado com sucesso!')
    router.push('/home')
  } else {
    alert('E-mail ou senha incorretos! Tente novamente.')
  }
}
</script>