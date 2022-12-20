<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import type CreateResume from '@/interfaces/createResume';
import requests from '@/helpers/requests';

const route = useRoute();
const router = useRouter();
const resume = ref<CreateResume>({
    name: '',
    abilities: [],
    age: 0,
    dateOfBirth: '',
    email: '',
    imageUrl: undefined,
});
const ability = ref('');
const isUrl = ref(false);
const image = ref<File | undefined>(undefined);
const error = ref('');

const onFileChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    if (target && target.files) {
        image.value = target.files[0];
    }
};

const addAbility = () => {
    if (ability.value) {
        resume.value.abilities.push(ability.value);
        ability.value = '';
    }
};

const listAbilitiesToFilter = computed(() => {
    return resume.value.abilities.join(', ');
});

const saveResume = () => {
    if (route.query.action === 'new') {
        if (image.value) {
            requests
                .createCV(resume.value, image.value)
                .then((resp) => {
                    router.push('/home');
                })
                .catch((err) => {
                    error.value = err.response.data.errors[0].msg;
                });
        } else {
            console.log(resume.value);

            requests
                .createCV(resume.value)
                .then((resp) => {
                    console.log(resp);
                    router.push('/home');
                })
                .catch((err) => {
                    error.value = err.response.data.errors[0].msg;
                });
        }
    }
};
</script>
<template>
    <div class="ml-6 mt-6">
        <h1 class="text-3xl">
            {{
                route.query.action === 'new'
                    ? 'Crear Nuevo Currículo'
                    : 'Editar Currículo'
            }}
        </h1>
        <p class="text-lg mt-3 font-bold text-red-600" v-if="error">
            {{ error }}
        </p>
        <div class="flex max-w-4xl justify-between items-center">
            <div>
                <div class="my-6 text-lg">
                    <label for="name">Nombre: </label>
                    <input
                        type="text"
                        id="name"
                        class="border rounded-md ml-2 py-1 px-2 border-gray-800"
                        v-model="resume.name"
                    />
                </div>
                <div class="my-6 text-lg">
                    <label for="abilities">Habilidades: </label>
                    <input
                        type="text"
                        id="abilities"
                        class="border rounded-md ml-2 py-1 px-2 border-gray-800"
                        v-model="ability"
                    />
                    <button
                        class="bg-cyan-200 py-2 px-3 rounded-lg font-semibold ml-3"
                        @click="addAbility"
                    >
                        Agregar
                    </button>
                    <span class="ml-3 block">{{ listAbilitiesToFilter }}</span>
                </div>
                <div class="my-6 text-lg">
                    <label for="age">Edad: </label>
                    <input
                        type="number"
                        min="0"
                        max="120"
                        id="age"
                        class="border rounded-md ml-2 py-1 px-2 border-gray-800"
                        v-model="resume.age"
                    />
                </div>
            </div>
            <div>
                <div class="my-6 text-lg">
                    <label for="email">Correo Electrónico: </label>
                    <input
                        type="text"
                        id="email"
                        class="border rounded-md ml-2 py-1 px-2 border-gray-800"
                        v-model="resume.email"
                    />
                </div>
                <div class="my-6 text-lg">
                    <label for="dateOfBirth">Fecha de Nacimiento: </label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        class="border rounded-md ml-2 py-1 px-2 border-gray-800"
                        v-model="resume.dateOfBirth"
                    />
                </div>
                <div class="my-6 text-lg">
                    <label for="isUrl">¿Subir url de la imagen?: </label>
                    <input
                        type="checkbox"
                        id="isUrl"
                        class="border rounded-md ml-2 py-1 px-2 border-gray-800"
                        v-model="isUrl"
                    />
                </div>
                <div v-if="!isUrl" class="my-6 text-lg">
                    <label for="image">Imagen: </label>
                    <input
                        type="file"
                        id="image"
                        accept="image/jpeg, image/png, image/jpg"
                        class="border rounded-md ml-2 py-1 px-2 border-gray-800"
                        @change="onFileChange($event)"
                    />
                </div>
                <div v-else class="my-6 text-lg">
                    <label for="imageUrl">Url de la Imagen: </label>
                    <input
                        type="text"
                        id="imageUrl"
                        class="border rounded-md ml-2 py-1 px-2 border-gray-800"
                        v-model="resume.imageUrl"
                    />
                </div>
            </div>
        </div>
        <button
            class="bg-blue-500 py-3 px-5 rounded-lg font-semibold ml-3"
            @click="saveResume"
        >
            Guardar
        </button>
    </div>
</template>
