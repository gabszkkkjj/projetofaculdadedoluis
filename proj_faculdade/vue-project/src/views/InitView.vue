<template>
  <div class="init-view">
    <h1>Bem-vindo ao DAWN.</h1>
    <p>Onde você quer ir hoje ?</p>
    
    <!-- Botão direto sem router-link em volta -->
    <button class="btn-shimmer" @click="irParaLogin">lets go</button>
  </div>


</template>

<style scoped>
.init-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}
  .btn-shimmer {
  position: relative;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: bold;
  color: #f6f3f3;
  background-color: #259feb; /* Azul base */
  border: none;
  border-radius: 121px;
  cursor: pointer;
  overflow: hidden; /* Esconde o brilho quando está fora do botão */
  transition: background-color 0.1s ease, transform 0.2s ease;
}

/* O raio de luz (invisível no início) */
.btn-shimmer::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transition: 0.5s;
  border-radius: inherit; /* Obrigatório para não vazar os cantos retangulares */
}

/* Faz o efeito passar ao passar o rato */


/* Quando passa o mouse */
.btn-shimmer:hover {
  background-color: #3cda07; /* Escurece o azul */
  transform: translateY(-3px); /* Eleva ligeiramente o botão */
}

/* Faz o raio de luz passar da esquerda para a direita */
.btn-shimmer:hover::before {
  left: 100%;
}

</style>
<script>
export default {
  methods: {
    irParaLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function irParaLogin() {
  router.push('/login')
}
</script>