<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import requests from '../helpers/requests';
import type AllResumes from '@/interfaces/allResumes';

const resumes = ref<AllResumes[]>([]);
const ability = ref('');
const abilities = ref<string[]>([]);
const minAge = ref(0);
const maxAge = ref(0);
const error = ref('');

const router = useRouter();

const requestData = () => {
    requests
        .getAll()
        .then((resp) => {
            resumes.value = resp;
        })
        .catch(console.log);
};

onMounted(() => {
    requestData();
});

const listAbilities = computed(() => {
    let abilities: string[] = [];
    resumes.value.forEach((resume, i) => {
        abilities[i] = resume.abilities.join(', ');
    });
    return abilities;
});

const addAbility = () => {
    if (ability.value) {
        abilities.value.push(ability.value);
        ability.value = '';
    }
};

const listAbilitiesToFilter = computed(() => {
    return abilities.value.join(', ');
});

const filter = () => {
    requests
        .getAll(abilities.value, minAge.value, maxAge.value)
        .then((resp) => {
            resumes.value = resp;
        })
        .catch(console.log);
};

const clear = () => {
    abilities.value = [];
    ability.value = '';
    minAge.value = 0;
    maxAge.value = 0;
    requestData();
};

const deleteCV = (id: string) => {
    requests
        .deleteCV(id)
        .then((resp) => {
            console.log(resp);
            requestData();
        })
        .catch((err) => {
            error.value = err.response.data.errors[0].msg;
        });
};

const editCV = (id: string) => {
    router.push(`/newEdit?action=edit&id=${id}`);
};
</script>
<template>
    <div>
        <span class="ml-6 text-red-600 font-bold">{{ error }}</span>
        <h3 class="ml-6 mt-4 text-lg">Filtrar por:</h3>
        <div class="flex items-start">
            <label class="ml-6 mt-1" for="">Habilidades:</label>
            <input
                type="text"
                class="border-2 border-gray-900 rounded-lg block mb-4 py-1 px-2 ml-3"
                v-model="ability"
            />
            <button
                class="bg-cyan-200 py-2 px-3 rounded-lg font-semibold ml-3"
                @click="addAbility"
            >
                Agregar
            </button>
            <span class="ml-3">{{ listAbilitiesToFilter }}</span>
        </div>
        <div class="flex items-start">
            <label class="ml-6 mt-1" for="">Edad Mínima:</label>
            <input
                type="number"
                class="border-2 border-gray-900 rounded-lg block mb-4 py-1 px-2 ml-3"
                min="0"
                max="120"
                v-model="minAge"
            />
            <label class="ml-6 mt-1" for="">Edad Máxima:</label>
            <input
                type="number"
                class="border-2 border-gray-900 rounded-lg block mb-4 py-1 px-2 ml-3"
                min="0"
                max="120"
                v-model="maxAge"
            />
            <button
                class="bg-gray-400 py-2 px-3 rounded-lg font-semibold ml-3"
                @click="filter"
            >
                Filtrar
            </button>
            <button
                class="bg-orange-400 py-2 px-3 rounded-lg font-semibold ml-3"
                @click="clear"
            >
                Limpiar Filtros
            </button>
        </div>
        <table class="ml-6 mt-6">
            <thead>
                <tr>
                    <td></td>
                    <td class="text-xl font-bold px-6">Nombre</td>
                    <td class="text-xl font-bold px-6">Edad</td>
                    <td class="text-xl font-bold px-6">Habilidades</td>
                    <td class="text-xl font-bold px-6">Acciones</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(resume, index) in resumes" :key="index">
                    <td class="py-2">
                        <img
                            v-if="
                                resume.imageUrl &&
                                resume.imageUrl.startsWith('http')
                            "
                            :src="resume.imageUrl"
                            class="w-16"
                        />

                        <img
                            v-else-if="resume.imageUrl"
                            :src="`http://localhost:3000/images/${resume.imageUrl}`"
                            class="w-16"
                        />
                        <img
                            v-else="resume.imageUrl"
                            src="@/assets/images/no-image.png"
                            class="w-16"
                        />
                    </td>
                    <td class="px-6">{{ resume.name }}</td>
                    <td class="px-6">{{ resume.age }}</td>
                    <td class="px-6">{{ listAbilities[index] }}</td>
                    <td class="px-6">
                        <button
                            class="bg-cyan-500 py-2 px-4 rounded-lg font-semibold"
                            @click="router.push(`/home/${resume._id}`)"
                        >
                            Detalles
                        </button>
                        <button
                            class="bg-orange-500 py-2 px-4 rounded-lg font-semibold ml-2"
                            @click="editCV(resume._id)"
                        >
                            Modificar
                        </button>
                        <button
                            class="bg-red-500 py-2 px-4 rounded-lg font-semibold ml-2"
                            @click="deleteCV(resume._id)"
                        >
                            Eliminar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
