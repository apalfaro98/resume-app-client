<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import requests from '../helpers/requests';
import type AllResumes from '@/interfaces/allResumes';

let resumes = ref<AllResumes[]>([]);

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
</script>
<template>
    <table class="ml-6 mt-6">
        <thead>
            <tr>
                <td></td>
                <td class="text-xl font-bold px-6">Nombre</td>
                <td class="text-xl font-bold px-6">Edad</td>
                <td class="text-xl font-bold px-6">Habilidades</td>
                <td class="text-xl font-bold px-6">Detalles</td>
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
                        @click=""
                    >
                        Detalles
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
