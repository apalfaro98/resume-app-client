<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import requests from '@/helpers/requests';
import type OneResume from '@/interfaces/oneResume';

const route = useRoute();
const id = route.params.id.toString();
const resume = ref<OneResume>();
const date = ref('');
const abilities = ref('');

const getData = () => {
    requests
        .getOne(id)
        .then((resp) => {
            resume.value = resp;
            date.value = formatDate();
            abilities.value = listAbilities();
        })
        .catch(console.log);
};
onMounted(() => {
    getData();
});

const formatDate = () => {
    const birth = new Date(resume.value!.dateOfBirth);
    let day = birth.getDate().toString();
    let month = (birth.getMonth() + 1).toString();
    const year = birth.getFullYear();

    if (Number(day) < 10) {
        day = '0' + day;
    }
    if (Number(month) < 10) {
        month = '0' + month;
    }

    return `${day}/${month}/${year}`;
};

const listAbilities = () => {
    let abilities: string | undefined = '';
    abilities = resume.value!.abilities.join(', ');
    return abilities;
};
</script>

<template>
    <div class="flex items-center ml-6 mt-5">
        <div>
            <img
                v-if="resume?.imageUrl && resume.imageUrl.startsWith('http')"
                :src="resume.imageUrl"
                class="w-72"
            />

            <img
                v-else-if="resume?.imageUrl"
                :src="`http://localhost:3000/images/${resume.imageUrl}`"
                class="w-72"
            />
            <img
                v-else="resume.imageUrl"
                src="@/assets/images/no-image.png"
                class="w-72"
            />
        </div>
        <div class="ml-10">
            <p class="text-lg font-bold mb-1">
                Nombre: <span class="font-normal ml-1">{{ resume?.name }}</span>
            </p>
            <p class="text-lg font-bold mb-1">
                Correo Electrónico:
                <span class="font-normal ml-1">{{ resume?.email }}</span>
            </p>
            <p class="text-lg font-bold mb-1">
                Fecha de Nacimiento:
                <span class="font-normal ml-1">{{ date }}</span>
            </p>
            <p class="text-lg font-bold mb-1">
                Edad:
                <span class="font-normal ml-1">{{ resume?.age }}</span>
            </p>
            <p class="text-lg font-bold mb-1">
                Habilidades:
                <span class="font-normal ml-1">{{ abilities }}</span>
            </p>
        </div>
    </div>
</template>
