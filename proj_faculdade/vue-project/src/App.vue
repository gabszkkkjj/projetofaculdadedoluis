<template>
  <header>
    <nav style="padding: 15px; display: flex; gap: 15px; background-color: #f4f4f4;">
      <router-link to="/">Início</router-link> |
      <router-link to="/login">Login</router-link>
    </nav>
  </header>


  <main style="padding: 20px;">
    <!-- O RouterView é responsável por carregar a página atual (HomeView, LoginView, etc) -->
    <RouterView />
  </main>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
/* Estilos globais básicos */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>