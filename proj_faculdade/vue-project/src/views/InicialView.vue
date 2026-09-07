<template>
  <!-- Container principal com imagem de fundo -->
  <div class="inicial-container">
    <main class="content-card">
      <h1>Bem-vindo ao outro Mundo!</h1>
      <p class="subtitle">DAWN.dream</p>
      
      <!-- Navegação interna para a rota de login -->
      <router-link to="/">
        <button class="btn-iniciar">Iniciar</button>
      </router-link>
    </main>
  </div>
</template>

<script setup>
// Lógica da tela inicial (caso precise no futuro)
</script>

<style scoped>
/* Fundo que ocupa a tela toda com imagem e escurecimento para leitura */
.inicial-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), 
                    url('/fundo.jpg'); /* Certifique-se de ter a imagem fundo.jpg na pasta public */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
}

/* Card centralizado com efeito glassmorphism */
.content-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  padding: 60px 40px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  text-align: center;
  color: #ffffff;
  max-width: 500px;
  width: 90%;
}

.content-card h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
  letter-spacing: 1px;
}

.subtitle {
  font-size: 18px;
  color: #3498db;
  margin-bottom: 40px;
  font-weight: 600;
  letter-spacing: 2px;
}

/* Estilo do botão de navegação */
.btn-iniciar {
  padding: 14px 40px;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #3498db, #2980b9);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
}

.btn-iniciar:hover {
  background: linear-gradient(135deg, #2980b9, #1f6391);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.6);
}

.btn-iniciar:active {
  transform: translateY(1px);
}
</style>