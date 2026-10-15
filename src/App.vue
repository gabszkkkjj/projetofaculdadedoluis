<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
/* Estilos globais básicos */
body {
  margin: 0;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  /* Esse fundo aparece por trás de QUALQUER página que não cubra a tela
     inteira sozinha. Se cada view já tem seu próprio fundo (Home, Login,
     Cadastro, Init), pode remover esta linha para evitar fundos duplicados. */
  background: url('@/assets/fundo.jpg') center / cover no-repeat fixed;
}

/* Transição entre páginas: a tela atual desaparece suavemente
   e a próxima some aparecendo no lugar, em vez de trocar de corte seco */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: scale(0.98);
}
.fade-leave-to {
  opacity: 0;
  transform: scale(1.02);
}
</style>