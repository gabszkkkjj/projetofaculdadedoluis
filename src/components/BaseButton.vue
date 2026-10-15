<template>
  <button :class="['btn', `btn-${variant}`]" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary' // 'primary', 'shimmer', 'neon', 'glass', '3d'
  }
})
defineEmits(['click'])
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

/* 1. Variante Shimmer (Brilho de Luz) */
.btn-shimmer {
  position: relative;
  background: #2563eb;
  color: #fff;
  overflow: hidden;
}
.btn-shimmer::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s ease;
}
.btn-shimmer:hover::before {
  left: 100%;
}

/* 2. Variante Neon */
.btn-neon {
  background: #00f0ff;
  color: #000;
}
.btn-neon:hover {
  box-shadow: 0 0 10px #00f0ff, 0 0 20px #00f0ff;
  transform: translateY(-2px);
}

/* 3. Variante 3D Tátil */
.btn-3d {
  background: #16a34a;
  color: #fff;
  box-shadow: 0 4px 0 #15803d;
}
.btn-3d:active {
  transform: translateY(4px);
  box-shadow: 0 0 0 #15803d;
}
</style>