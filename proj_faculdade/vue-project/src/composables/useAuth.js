import { ref } from 'vue'

const CHAVE_USUARIOS = 'dawn_usuarios'
const CHAVE_SESSAO = 'usuarioLogado'

function ler(chave, padrao) {
  try {
    const v = localStorage.getItem(chave)
    return v ? JSON.parse(v) : padrao
  } catch {
    return padrao
  }
}

// Conta de teste que você já usava
const ADMIN = { id: 'admin', nome: 'Administrador', email: 'admin@cidade.com', senha: '123456' }

const lista = ler(CHAVE_USUARIOS, [])
if (!lista.some((u) => u.email === ADMIN.email)) {
  lista.push(ADMIN)
  localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(lista))
}

// Estado compartilhado: todos os componentes enxergam o mesmo usuário logado
const sessao = ler(CHAVE_SESSAO, null)
const usuarioLogado = ref(sessao && typeof sessao === 'object' ? sessao : null)

// Limpa o valor antigo ('true'), que não tem id nem nome
if (localStorage.getItem(CHAVE_SESSAO) && !usuarioLogado.value) {
  localStorage.removeItem(CHAVE_SESSAO)
}

const normalizar = (email) => String(email).trim().toLowerCase()

export function useAuth() {
  function cadastrar({ nome, email, senha }) {
    const usuarios = ler(CHAVE_USUARIOS, [])
    const emailNorm = normalizar(email)
    if (usuarios.some((u) => u.email === emailNorm)) {
      return { ok: false, erro: 'Já existe uma conta com esse e-mail.' }
    }
    usuarios.push({ id: Date.now(), nome: nome.trim(), email: emailNorm, senha: senha.trim() })
    localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios))
    return { ok: true }
  }

  function entrar(email, senha) {
    const usuarios = ler(CHAVE_USUARIOS, [])
    const u = usuarios.find((x) => x.email === normalizar(email) && x.senha === String(senha).trim())
    if (!u) return { ok: false, erro: 'E-mail ou senha incorretos.' }

    // A senha nunca vai para a sessão
    const nova = { id: u.id, nome: u.nome, email: u.email }
    usuarioLogado.value = nova
    localStorage.setItem(CHAVE_SESSAO, JSON.stringify(nova))
    return { ok: true }
  }

  function sair() {
    usuarioLogado.value = null
    localStorage.removeItem(CHAVE_SESSAO)
  }

  return { usuarioLogado, cadastrar, entrar, sair }
}
