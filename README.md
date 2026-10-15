# 🌅 DAWN. — Portal de Eventos

O **DAWN.** é um portal de eventos feito com **Vue 3**. Qualquer pessoa pode ver os eventos publicados; quem cria uma conta pode publicar os próprios eventos, editá-los, excluí-los e se inscrever nos eventos de outras pessoas.

Todos os dados ficam salvos no navegador (`localStorage`), então o projeto funciona sem back-end.

> Projeto desenvolvido durante o curso de Análise e Desenvolvimento de Sistemas.

## 📸 Screenshots

<!-- Coloque os prints na pasta docs/ e ajuste os caminhos -->
| Tela inicial | Login | Eventos |
|---|---|---|
| ![Início](docs/inicio.png) | ![Login](docs/login.png) | ![Eventos](docs/eventos.png) |

## ✨ Funcionalidades

**Contas**
- Cadastro com nome completo, e-mail e senha (mínimo de 6 caracteres)
- Bloqueio de e-mails duplicados (o e-mail é normalizado: sem espaços e em minúsculas)
- Login com e-mail e senha, com mensagens de erro e de sucesso
- Sessão mantida no navegador, mesmo depois de recarregar a página
- Sair da conta

**Eventos (CRUD completo)**
- **Criar** evento com título, data, local, descrição e imagem opcional
- **Editar** e **excluir** eventos, com confirmação antes de excluir
- Somente quem criou o evento pode editá-lo ou excluí-lo (a regra é verificada no código, não só escondida na interface)
- Imagens são redimensionadas (máx. 800 px) e comprimidas antes de salvar, para não encher o `localStorage`

**Participação e navegação**
- Inscrição e cancelamento de inscrição, com contador de inscritos
- Busca por título ou local
- Filtros: **Todos**, **Criados por mim** e **Minhas inscrições**
- Eventos ordenados por data
- Rota `/home` protegida: quem não está logado é redirecionado para o login
- Rotas carregadas sob demanda (*lazy loading*)

**Acessibilidade (já implementado)**
- `label` em todos os campos de formulário
- Mensagens de erro com `role="alert"` e de sucesso com `role="status"`
- Foco visível em botões, links e campos
- Campo de upload acessível por teclado
- Data de cada evento disponível para leitores de tela (`<time>`)
- Texto alternativo nas imagens
- Layout responsivo

## 🛠️ Tecnologias

- [Vue 3](https://vuejs.org/) com Composition API (`<script setup>`)
- [Vue Router](https://router.vuejs.org/) com guarda de navegação
- HTML5 e CSS3 (estilos escopados nos componentes)
- JavaScript
- `localStorage` para guardar usuários, sessão, eventos e inscrições

## 📁 Estrutura

```
src/
├── assets/              # Logo e imagem de fundo
├── components/
│   └── EventCard.vue    # Card de evento (inscrição, edição, exclusão)
├── composables/
│   ├── useAuth.js       # Cadastro, login e sessão
│   └── useEventos.js    # CRUD de eventos e inscrições
├── router/
│   └── index.js         # Rotas e proteção de páginas
└── views/
    ├── InitView.vue     # Tela de boas-vindas
    ├── LoginView.vue    # Login
    ├── RegisterView.vue # Cadastro
    └── HomeView.vue     # Lista de eventos, busca, filtros e formulário
```

## 🚀 Como rodar

Pré-requisito: [Node.js](https://nodejs.org/) instalado.

```bash
# 1. Clone o repositório
git clone https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git

# 2. Entre na pasta
cd NOME-DO-REPOSITORIO

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Depois, abra o endereço que aparecer no terminal (normalmente `http://localhost:5173`).

<!-- Confira se os comandos acima batem com o package.json do seu projeto -->

### 🧪 Conta de teste

O projeto cria automaticamente uma conta de administrador e um evento de exemplo, para você testar sem cadastrar nada:

| E-mail | Senha |
|---|---|
| `admin@cidade.com` | `123456` |

Logado com essa conta, você pode editar e excluir o evento de exemplo.

## ⚠️ Limitações conhecidas

- Os dados ficam **somente no navegador** em que foram criados. Limpar os dados do navegador apaga tudo, e outro computador não vê os mesmos eventos.
- Não existe servidor: **as senhas são salvas em texto puro no `localStorage`**. O login é uma simulação para fins de estudo e **não deve ser usado com dados ou senhas reais**.
- O espaço do `localStorage` é limitado (cerca de 5 MB), o que restringe a quantidade de eventos com imagem.

## 🔮 Próximos passos

### ♿ Acessibilidade
- [ ] Mover o foco para o formulário ao abrir "Novo evento" ou "Editar"
- [ ] Anunciar para leitores de tela quando uma inscrição for feita ou cancelada
- [ ] Indicar o filtro ativo também por `aria-pressed`
- [ ] Revisar o contraste de cores (WCAG AA), principalmente textos sobre o vermelho do tema
- [ ] Mostrar mensagens de erro por campo, e não só uma mensagem geral
- [ ] Adicionar um link "pular para o conteúdo"

### 🐛 Correção de bugs
- [ ] Remover o bloco de depuração (`<pre>`) deixado no `EventCard.vue`
- [ ] Corrigir a guarda do router: ela redireciona `/init`, mas a tela inicial é `/` (usuário logado ainda vê a tela de boas-vindas e a de cadastro)
- [ ] Remover os `import` não usados no topo do `router/index.js`
- [ ] Limpar o `InitView.vue` (dois blocos `<script>` e CSS com propriedades inválidas)
- [ ] Avisar o usuário quando o `localStorage` estiver cheio (hoje só aparece um aviso no console e o evento some ao recarregar)
- [ ] Validar a data do evento e impedir datas inválidas
- [ ] Não alterar a senha com `trim()` no cadastro e no login
- [ ] Padronizar o visual entre as telas de login e cadastro

### 🚧 Ideias futuras
- [ ] Back-end com banco de dados real e autenticação segura
- [ ] Senhas com hash
- [ ] Eventos passados separados dos futuros
- [ ] Fazer um App para Mobile

## 📚 O que aprendi

- Organizar uma aplicação Vue em views, componentes e composables
- Compartilhar estado entre componentes com `ref` fora da função do composable
- Implementar um CRUD completo com regras de permissão (só o dono edita e exclui)
- Proteger rotas com `beforeEach` do Vue Router
- Comunicação entre componentes com props e eventos (`emit`)
- Trabalhar com formulários, upload e compressão de imagem no navegador
- Aplicar práticas básicas de acessibilidade desde o início

## 👤 Autor

**Marcus Gabriel**
[LinkedIn](https://www.linkedin.com/in/SEU-PERFIL) • [GitHub](https://github.com/SEU-USUARIO)
