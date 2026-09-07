<template> 
  <main style="max-width: 400px; margin: 50px auto; font-family: sans-serif;">
    <h2>Criar Nova Conta</h2>
    <form @submit.prevent="cadastrarUsuario">
        <div style="margin-bottom: 15px;">
            <label style="display: block;">Nome Completo:</label>
            <input type="text" v-model="nome" placeholder="Digite seu nome completo" required>
        </div>

        <div style="margin-bottom: 15px;">
            <label style="display: block;">Email:</label>
            <input type="email" v-model="email" placeholder="Digite seu email" required>
        </div>  
        <div style="margin-bottom: 15px;">
            <label style="display: block;">Senha:</label>
            <input type="password" v-model="senha" placeholder="Digite sua senha" required>
        </div>
        <button type="submit">Cadastrar</button>
    </form>
    <p style="margin-top: 20px;">Já tem uma conta? <router-link to="/login">Faça login</router-link></p>
  </main>
  </template>

<script setup>
  import { ref } from 'vue'; 
  import { useRouter } from 'vue-router';

   const router = useRouter();
   
    const nome = ref('');
    const email = ref('');
    const senha = ref('');

function cadastrarUsuario() {
    // Aqui você pode adicionar a lógica para cadastrar o usuário, como enviar os dados para um servidor
    const novoUsuario = {
        nome: nome.value,
        email: email.value,
        senha: senha.value
    };
    localStorage.setItem('usuarioCadastrado', JSON.stringify(novoUsuario))
    alert('Conta criada com sucesso ! Faça login para continuar. ');

    // Redirecionar para a página de login após o cadastro
    router.push('/login');
}
</script>
