<script setup lang="ts">
import { ref } from 'vue';
import requests from '../helpers/requests';

const isLogin = ref(true);
const email = ref('');
const password = ref('');
const error = ref('');

const sendData = () => {
    if (isLogin.value) {
        requests
            .auth(email.value, password.value)
            .then(console.log)
            .catch((err) => {
                error.value = err.response.data.errors[0].msg;
            });
    }
};
</script>

<template>
    <div class="h-screen flex items-center justify-center">
        <div>
            <h1 v-if="isLogin" class="text-3xl mb-4">Iniciar Sesión:</h1>
            <h1 v-else class="text-3xl mb-4">Crear cuenta:</h1>
            <p v-if="error" class="text-red-600 mb-2">{{ error }}</p>
            <label for="email">Correo Electrónico: </label>
            <input
                type="text"
                id="email"
                class="border-2 border-gray-900 rounded-lg block mb-4 py-1 px-2 w-72"
                v-model="email"
            />
            <label for="password">Contraseña: </label>
            <input
                type="text"
                id="password"
                class="border-2 border-gray-900 rounded-lg block mb-4 py-1 px-2 w-72"
                v-model="password"
            />
            <p v-if="isLogin">
                ¿No tiene cuenta?
                <span
                    class="text-blue-600 hover:cursor-pointer"
                    @click="isLogin = false"
                    >Crear cuenta</span
                >
            </p>
            <p v-else>
                ¿Ya tienes cuenta?
                <span
                    class="text-blue-600 hover:cursor-pointer"
                    @click="isLogin = true"
                    >Iniciar sesión</span
                >
            </p>
            <div class="w-full flex justify-center">
                <button
                    class="bg-blue-500 py-3 px-5 mt-4 rounded-lg text-white"
                    @click="sendData"
                >
                    {{ isLogin ? 'INICIAR SESION' : 'CREAR CUENTA' }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
