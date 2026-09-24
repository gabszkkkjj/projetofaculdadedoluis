<template>
  <div class="home">
    <header class="topo">
      <div class="topo__conteudo">
        <div>
          <p class="marca">DAWN.</p>
          <h2>Eventos disponíveis</h2>
        </div>
        <div v-if="usuarioLogado" class="topo__usuario">
          <span>Olá, {{ primeiroNome }}</span>
          <button class="btn btn--alvorada" @click="abrirNovo">Novo evento</button>
          <button class="btn btn--contorno" @click="tratarSaida">Sair</button>
        </div>
        <router-link v-else to="/login" class="btn btn--alvorada">Entrar</router-link>
      </div>
    </header>

    <section class="conteudo">
      <form v-if="formAberto" class="form" novalidate @submit.prevent="salvar">
        <h3>{{ editandoId ? 'Editar evento' : 'Novo evento' }}</h3>
        <label>
          Título
          <input v-model="form.titulo" maxlength="80" placeholder="Ex.: Show na praça" />
        </label>
        <div class="form__linha">
          <label>
            Data
            <input v-model="form.data" type="date" />
          </label>
          <label>
            Local
            <input v-model="form.local" maxlength="80" placeholder="Onde vai acontecer" />
          </label>
        </div>
        <label>
          Descrição
          <textarea v-model="form.descricao" rows="3" maxlength="300" placeholder="Conte o que as pessoas vão encontrar"></textarea>
        </label>
        <div class="imagem">
          <span class="imagem__rotulo">Imagem do evento (opcional)</span>
          <img
            v-if="form.imagem"
            :src="form.imagem"
            alt="Pré-visualização da imagem do evento"
            class="imagem__previa"
          />
          <div class="imagem__acoes">
            <label class="btn btn--linha imagem__escolher">
              {{ form.imagem ? 'Trocar imagem' : 'Escolher imagem' }}
              <input
                ref="inputArquivo"
                class="imagem__input"
                type="file"
                accept="image/*"
                @change="escolherImagem"
              />
            </label>
            <button v-if="form.imagem" type="button" class="btn btn--linha btn--aviso" @click="removerImagem">
              Remover imagem
            </button>
          </div>
        </div>
        <p v-if="erro" class="erro" role="alert">{{ erro }}</p>
        <div class="form__acoes">
          <button type="submit" class="btn btn--azul">
            {{ editandoId ? 'Salvar alterações' : 'Publicar evento' }}
          </button>
          <button type="button" class="btn btn--linha" @click="fechar">Cancelar</button>
        </div>
      </form>

      <div class="barra">
        <input
          v-model="busca"
          type="search"
          class="busca"
          placeholder="Buscar por título ou local"
          aria-label="Buscar eventos"
        />
        <div v-if="usuarioLogado" class="seg" role="group" aria-label="Filtrar eventos">
          <button :class="{ ativo: filtro === 'todos' }" @click="filtro = 'todos'">Todos</button>
          <button :class="{ ativo: filtro === 'meus' }" @click="filtro = 'meus'">Criados por mim</button>
          <button :class="{ ativo: filtro === 'inscrito' }" @click="filtro = 'inscrito'">Minhas inscrições</button>
        </div>
      </div>

      <div v-if="visiveis.length" class="grid">
        <EventCard
          v-for="evento in visiveis"
          :key="evento.id"
          :evento="evento"
          :usuario="usuarioLogado"
          @inscrever="tratarInscricao"
          @editar="abrirEdicao"
          @excluir="tratarExclusao"
        />
      </div>
      <p v-else class="vazio">{{ mensagemVazia }}</p>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'
import { useEventos } from '../composables/useEventos.js'
import EventCard from '../components/EventCard.vue'

const router = useRouter()
const { usuarioLogado, sair } = useAuth()
const { eventos, criarEvento, atualizarEvento, removerEvento, alternarInscricao } = useEventos()

/* ---------- Estado da tela ---------- */
const formAberto = ref(false)
const editandoId = ref(null)
const erro = ref('')
const busca = ref('')
const filtro = ref('todos') // 'todos' | 'meus' | 'inscrito'
const form = reactive({ titulo: '', data: '', local: '', descricao: '', imagem: '' })
const inputArquivo = ref(null)

const primeiroNome = computed(() => usuarioLogado.value?.nome.split(' ')[0] ?? '')

/* ---------- READ: lista filtrada e ordenada por data ---------- */
const visiveis = computed(() => {
  const termo = busca.value.trim().toLowerCase()
  const u = usuarioLogado.value
  return eventos.value
    .filter((e) => {
      if (filtro.value === 'meus') return !!u && e.criadorId === u.id
      if (filtro.value === 'inscrito') return !!u && (e.inscritos ?? []).includes(u.id)
      return true
    })
    .filter((e) => !termo || `${e.titulo} ${e.local}`.toLowerCase().includes(termo))
    .slice()
    .sort((a, b) => a.data.localeCompare(b.data))
})

const mensagemVazia = computed(() => {
  if (filtro.value === 'meus') return 'Você ainda não publicou nenhum evento.'
  if (filtro.value === 'inscrito') return 'Você ainda não se inscreveu em nenhum evento.'
  return 'Nenhum evento encontrado.'
})

/* ---------- CREATE / UPDATE ---------- */
function salvar() {
  if (!form.titulo.trim() || !form.data || !form.local.trim()) {
    erro.value = 'Preencha título, data e local para publicar.'
    return
  }
  const dados = {
    titulo: form.titulo.trim(),
    data: form.data,
    local: form.local.trim(),
    descricao: form.descricao.trim(),
    imagem: form.imagem,
  }
  if (editandoId.value) atualizarEvento(editandoId.value, dados, usuarioLogado.value)
  else criarEvento(dados, usuarioLogado.value)
  fechar()
}

function abrirNovo() {
  editandoId.value = null
  Object.assign(form, { titulo: '', data: '', local: '', descricao: '', imagem: '' })
  erro.value = ''
  formAberto.value = true
}

function abrirEdicao(evento) {
  editandoId.value = evento.id
  Object.assign(form, {
    titulo: evento.titulo,
    data: evento.data,
    local: evento.local,
    descricao: evento.descricao ?? '',
    imagem: evento.imagem ?? '',
  })
  erro.value = ''
  formAberto.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/* ---------- Imagem: lê o arquivo, reduz e guarda como texto (data URL) ---------- */
const LARGURA_MAXIMA = 800

function escolherImagem(e) {
  const arquivo = e.target.files[0]
  if (!arquivo) return
  if (!arquivo.type.startsWith('image/')) {
    erro.value = 'Escolha um arquivo de imagem (JPG, PNG ou WebP).'
    return
  }

  const leitor = new FileReader()
  leitor.onload = () => {
    const img = new Image()
    img.onload = () => {
      // Reduz para no máximo 800px de largura, senão o localStorage enche rápido
      const escala = Math.min(1, LARGURA_MAXIMA / img.width)
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * escala)
      canvas.height = Math.round(img.height * escala)
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#fff' // PNG com fundo transparente não vira preto
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      form.imagem = canvas.toDataURL('image/jpeg', 0.75)
      erro.value = ''
    }
    img.onerror = () => {
      erro.value = 'Não foi possível ler essa imagem. Tente outro arquivo.'
    }
    img.src = leitor.result
  }
  leitor.readAsDataURL(arquivo)
}

function removerImagem() {
  form.imagem = ''
  if (inputArquivo.value) inputArquivo.value.value = ''
}

function fechar() {
  formAberto.value = false
  editandoId.value = null
  erro.value = ''
}

/* ---------- DELETE e inscrição ---------- */
function tratarExclusao(eventoId) {
  removerEvento(eventoId, usuarioLogado.value)
}

function tratarInscricao(eventoId) {
  if (usuarioLogado.value) {
    alternarInscricao(eventoId, usuarioLogado.value.id)
  }
}

function tratarSaida() {
  sair()
  router.push('/login')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&display=swap');

.home {
  --fundo: #f3f8fc;
  --escuro: #0f2a3d;
  --azul: #259feb;
  --azul-texto: #1479bd;
  --alvorada: #ffb547;
  --coral: #c8443a;
  --texto: #16262e;
  --suave: #55696f;
  --borda: #d6e3ec;

  min-height: 100vh;
  background: var(--fundo);
  color: var(--texto);
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  line-height: 1.5;
  text-align: left;
}

/* Topo */
.topo { background: var(--escuro); color: #fff; padding: 1.75rem 1.25rem 3rem; }
.topo__conteudo {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
}
.marca { margin: 0; font-weight: 800; letter-spacing: 0.02em; color: var(--alvorada); }
.topo h2 { margin: 0; font-size: clamp(1.9rem, 5vw, 2.8rem); font-weight: 800; line-height: 1.1; }
.topo__usuario { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }

/* Conteúdo */
.conteudo { max-width: 960px; margin: -1.5rem auto 0; padding: 0 1.25rem 3rem; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(340px, 100%), 1fr));
  gap: 16px;
}
.vazio { text-align: center; color: var(--suave); padding: 2.5rem 0; }

/* Botões */
.btn {
  font: inherit;
  font-weight: 600;
  padding: 0.55rem 1.15rem;
  border-radius: 999px;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
}
.btn--azul { background: var(--azul); color: #fff; }
.btn--alvorada { background: var(--alvorada); color: var(--escuro); }
.btn--contorno { background: transparent; border-color: #4b6577; color: #fff; }
.btn--linha { background: transparent; border-color: var(--borda); color: var(--texto); }
.btn:hover { filter: brightness(0.93); }
.btn:focus-visible,
input:focus-visible,
textarea:focus-visible,
.seg button:focus-visible { outline: 3px solid var(--alvorada); outline-offset: 2px; }

/* Formulário */
.form {
  background: #fff;
  border: 1px solid var(--borda);
  border-radius: 14px;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
  display: grid;
  gap: 0.9rem;
}
.form h3 { margin: 0; font-size: 1.3rem; }
.form label { display: grid; gap: 0.3rem; font-weight: 600; font-size: 0.92rem; }
.form input,
.form textarea,
.busca {
  font: inherit;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--borda);
  border-radius: 10px;
  background: #fff;
  color: var(--texto);
}
.form__linha { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem; }
.form__acoes { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.erro { margin: 0; color: var(--coral); font-weight: 600; }

/* Busca e filtros */
.barra { display: flex; gap: 0.75rem; flex-wrap: wrap; margin: 1.25rem 0; }
.busca { flex: 1 1 220px; }
.seg { display: inline-flex; border: 1px solid var(--borda); border-radius: 999px; overflow: hidden; background: #fff; }
.seg button {
  font: inherit;
  border: 0;
  background: transparent;
  padding: 0.55rem 1rem;
  cursor: pointer;
  color: var(--suave);
}
.seg button.ativo { background: var(--escuro); color: #fff; }

/* Campo de imagem */
.imagem { display: grid; gap: 0.5rem; }
.imagem__rotulo { font-weight: 600; font-size: 0.92rem; }
.imagem__previa {
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid var(--borda);
}
.imagem__acoes { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.form .imagem__escolher { position: relative; display: inline-block; font-size: 1rem; }
/* O input some visualmente, mas continua acessível pelo teclado */
.form .imagem__input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  border: 0;
  opacity: 0;
  overflow: hidden;
}
.imagem__escolher:focus-within { outline: 3px solid var(--alvorada); outline-offset: 2px; }

@media (max-width: 560px) {
  .form__linha { grid-template-columns: 1fr; }
}
</style>
