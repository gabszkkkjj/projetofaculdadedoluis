import { ref, watch } from 'vue'

const CHAVE = 'dawn_eventos'

function ler(chave, padrao) {
  try {
    const v = localStorage.getItem(chave)
    return v ? JSON.parse(v) : padrao
  } catch {
    return padrao
  }
}

// Evento de exemplo (pertence ao admin, então dá para editar e excluir logando com ele)
const eventoInicial = {
  id: 1,
  titulo: 'Feira de artesanato e sabores locais',
  data: '2026-10-18',
  local: 'Praça central',
  descricao: 'Artesanato, comidas típicas e música ao vivo a partir das 16h.',
  imagem: '', // pode ser um caminho como '/eventos/feira.jpg' (arquivo em public/eventos)
  criadorId: 'admin',
  criadorNome: 'Administrador',
  inscritos: [],
}

// Estado compartilhado entre todos os componentes
const eventos = ref(ler(CHAVE, null) ?? [eventoInicial])

// Imagens pesam mais que texto: se o navegador ficar sem espaço, não derruba o app
watch(
  eventos,
  (v) => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(v))
    } catch {
      console.warn('Sem espaço no navegador para salvar os eventos. Use imagens menores.')
    }
  },
  { deep: true }
)

const ehDono = (evento, usuario) => !!usuario && evento.criadorId === usuario.id
const buscar = (id) => eventos.value.find((e) => e.id === id)

export function useEventos() {
  // CREATE
  function criarEvento(dados, usuario) {
    if (!usuario) return
    eventos.value.unshift({
      id: Date.now(),
      ...dados,
      criadorId: usuario.id,
      criadorNome: usuario.nome,
      inscritos: [],
    })
  }

  // UPDATE (só o dono)
  function atualizarEvento(id, dados, usuario) {
    const e = buscar(id)
    if (e && ehDono(e, usuario)) Object.assign(e, dados)
  }

  // DELETE (só o dono)
  function removerEvento(id, usuario) {
    const e = buscar(id)
    if (e && ehDono(e, usuario)) {
      eventos.value = eventos.value.filter((x) => x.id !== id)
    }
  }

  // Inscrição: entra se não está, sai se já está
  function alternarInscricao(eventoId, usuarioId) {
    const e = buscar(eventoId)
    if (!e) return
    if (!e.inscritos) e.inscritos = []
    const i = e.inscritos.indexOf(usuarioId)
    if (i === -1) e.inscritos.push(usuarioId)
    else e.inscritos.splice(i, 1)
  }

  return { eventos, criarEvento, atualizarEvento, removerEvento, alternarInscricao }
}
