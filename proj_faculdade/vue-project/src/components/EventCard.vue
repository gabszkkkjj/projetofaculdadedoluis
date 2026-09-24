<template>
  <div class="card">
    <h3>{{ evento.titulo }}</h3>
    <p class="data">🗓️ {{ evento.data }}</p>
    <p>{{ evento.descricao }}</p>
    
    <div class="rodape">
      <span>Inscritos: {{ evento.inscritos.length }}</span>

      <!-- Uso do Botão Reutilizável -->
      <BaseButton 
        v-if="usuario"
        :variant="isInscrito ? '3d' : 'shimmer'"
        @click="$emit('inscrever', evento.id)"
      >
        {{ isInscrito ? '✓ Inscrito' : 'Inscrever-se' }}
      </BaseButton>
      <small v-else>Faça login para se inscrever</small>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  evento: Object,
  usuario: Object
})

defineEmits(['inscrever'])

const isInscrito = computed(() => {
  return props.usuario && props.evento.inscritos.includes(props.usuario.id)
})
</script>

<style scoped>
.card {
  border: 1px solid #e5e7eb;
  padding: 16px;
  border-radius: 8px;
  background: white;
}
.rodape {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}
</style>