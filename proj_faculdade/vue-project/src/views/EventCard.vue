<template>
  <article class="card">
    <div class="card__topo" :class="{ 'card__topo--sem-imagem': !evento.imagem }">
      <img
        v-if="evento.imagem"
        :src="evento.imagem"
        alt="Imagem do evento"
        class="card__img"
        loading="lazy"
      />
      <div class="card__data" aria-hidden="true">
        <strong>{{ dia }}</strong>
        <span>{{ mes }}</span>
        <small>{{ ano }}</small>
      </div>
      <time class="sr-only" :datetime="evento.data">{{ dataCompleta }}</time>
    </div>

    <div class="card__corpo">
      <h3>{{ evento.titulo }}</h3>
      <p class="card__local">{{ evento.local }}</p>
      <p v-if="evento.descricao" class="card__desc">{{ evento.descricao }}</p>
      <p class="card__meta">
        Publicado por {{ evento.criadorNome }}<br />
        {{ total }} {{ total === 1 ? 'inscrito' : 'inscritos' }}
      </p>

      <div class="acoes">
        <button
          v-if="usuario"
          class="btn"
          :class="inscrito ? 'btn--linha' : 'btn--azul'"
          @click="$emit('inscrever', evento.id)"
        >
          {{ inscrito ? 'Cancelar inscrição' : 'Inscrever-se' }}
        </button>
        <router-link v-else to="/login" class="link">Entre para se inscrever</router-link>
      </div>

      <div v-if="dono" class="acoes acoes--dono">
        <template v-if="confirmando">
          <span>Excluir este evento?</span>
          <button class="btn btn--perigo" @click="excluir">Sim, excluir</button>
          <button class="btn btn--linha" @click="confirmando = false">Manter</button>
        </template>
        <template v-else>
          <button class="btn btn--linha" @click="$emit('editar', evento)">Editar</button>
          <button class="btn btn--linha btn--aviso" @click="confirmando = true">Excluir</button>
        </template>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  evento: { type: Object, required: true },
  usuario: { type: Object, default: null },
})
const emit = defineEmits(['inscrever', 'editar', 'excluir'])

const confirmando = ref(false)

const dono = computed(() => !!props.usuario && props.evento.criadorId === props.usuario.id)
const inscritos = computed(() => props.evento.inscritos ?? [])
const inscrito = computed(() => !!props.usuario && inscritos.value.includes(props.usuario.id))
const total = computed(() => inscritos.value.length)

const data = computed(() => new Date(props.evento.data + 'T00:00:00'))
const dia = computed(() => data.value.toLocaleDateString('pt-BR', { day: '2-digit' }))
const mes = computed(() => data.value.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', ''))
const ano = computed(() => data.value.getFullYear())
const dataCompleta = computed(() => data.value.toLocaleDateString('pt-BR', { dateStyle: 'long' }))

function excluir() {
  emit('excluir', props.evento.id)
  confirmando.value = false
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--borda);
  border-radius: 14px;
  overflow: hidden;
}

/* Topo: imagem com a data por cima */
.card__topo {
  position: relative;
  aspect-ratio: 16 / 9;
  background: var(--escuro);
}
.card__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card__data {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  background: var(--alvorada);
  color: var(--escuro);
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
}
.card__data strong { font-size: 1.4rem; font-weight: 800; line-height: 1; }
.card__data span { font-weight: 600; text-transform: capitalize; }
.card__data small { font-size: 0.8rem; opacity: 0.8; }

/* Sem imagem: vira uma faixa da cor do amanhecer, com a data em destaque */
.card__topo--sem-imagem {
  aspect-ratio: auto;
  background: var(--alvorada);
  padding: 0.9rem 1.15rem;
}
.card__topo--sem-imagem .card__data {
  position: static;
  padding: 0;
  background: transparent;
  border-radius: 0;
}
.card__topo--sem-imagem .card__data strong { font-size: 2.2rem; }

.card__corpo { padding: 1rem 1.15rem; flex: 1; min-width: 0; }
.card__corpo h3 { margin: 0; font-size: 1.25rem; line-height: 1.2; }
.card__local { margin: 0.2rem 0 0; color: var(--azul-texto); font-weight: 600; }
.card__desc { margin: 0.6rem 0 0; }
.card__meta { margin: 0.6rem 0 0; font-size: 0.85rem; color: var(--suave); }

.acoes {
  margin-top: 0.9rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
}
.acoes--dono {
  padding-top: 0.9rem;
  border-top: 1px solid var(--borda);
}

.btn {
  font: inherit;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 1px solid transparent;
  cursor: pointer;
}
.btn--azul { background: var(--azul); color: #fff; }
.btn--perigo { background: var(--coral); color: #fff; }
.btn--linha { background: transparent; border-color: var(--borda); color: var(--texto); }
.btn--aviso { color: var(--coral); }
.btn:hover { filter: brightness(0.93); }
.btn:focus-visible,
.link:focus-visible { outline: 3px solid var(--alvorada); outline-offset: 2px; }
.link { color: var(--azul-texto); font-weight: 600; }

/* Texto só para leitores de tela (a data visual é decorativa) */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
