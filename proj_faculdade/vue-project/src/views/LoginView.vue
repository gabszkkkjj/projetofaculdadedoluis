<template>
  <div class="auth">
    <main class="auth__card">
      <p class="auth__marca">DAWN.</p>
      <h2>Acessar o portal</h2>

      <p v-if="veioDoCadastro && !erro" class="auth__ok" role="status">
        Conta criada. Entre para continuar.
      </p>

      <form @submit.prevent="fazerLogin">
        <label>
          E-mail
          <input v-model="email" type="email" placeholder="voce@email.com" required />
        </label>
        <label>
          Senha
          <input v-model="senha" type="password" placeholder="Sua senha" required />
        </label>
        <p v-if="erro" class="auth__erro" role="alert">{{ erro }}</p>
        <button type="submit" class="auth__btn">Entrar</button>
      </form>

      <p class="auth__rodape">
        Não tem conta? <router-link to="/cadastro">Cadastre-se aqui</router-link>
      </p>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const route = useRoute()
const { entrar } = useAuth()

const email = ref('')
const senha = ref('')
const erro = ref('')
const veioDoCadastro = route.query.cadastro === 'ok'

function fazerLogin() {
  const resultado = entrar(email.value, senha.value)
  if (resultado.ok) {
    router.push('/home')
  } else {
    erro.value = resultado.erro
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&display=swap');

.auth {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 1.25rem;
  background: #f3f8fc;
  color: #16262e;
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
}
.auth__card {
  width: 100%;
  max-width: 400px;
  background: #fff;
  border: 1px solid #d6e3ec;
  border-radius: 16px;
  padding: 2rem 1.75rem;
  text-align: left;
}
.auth__marca { margin: 0; font-weight: 800; color: #e08a00; }
.auth h2 { margin: 0.25rem 0 1.25rem; font-size: 1.8rem; font-weight: 800; }
form { display: grid; gap: 1rem; }
label { display: grid; gap: 0.3rem; font-weight: 600; font-size: 0.92rem; }
input {
  font: inherit;
  padding: 0.65rem 0.8rem;
  border: 1px solid #d6e3ec;
  border-radius: 10px;
}
input:focus-visible,
.auth__btn:focus-visible { outline: 3px solid #ffb547; outline-offset: 2px; }
.auth__btn {
  font: inherit;
  font-weight: 700;
  padding: 0.7rem 1rem;
  border: 0;
  border-radius: 999px;
  background: #259feb;
  color: #fff;
  cursor: pointer;
}
.auth__btn:hover { filter: brightness(0.93); }
.auth__erro { margin: 0; color: #c8443a; font-weight: 600; }
.auth__ok { margin: 0 0 1rem; color: #1a7a3c; font-weight: 600; }
.auth__rodape { margin: 1.25rem 0 0; }
.auth__rodape a { color: #1479bd; font-weight: 600; }
</style>
