<script setup lang="ts">
import ResumesTable from '../components/ResumesTable.vue';
</script>

<template>
    <div>
        <div class="flex justify-between items-center w-4/5">
            <h1 class="text-3xl ml-4 mt-7">Currículos</h1>
            <button
                class="bg-green-600 py-2 px-6 rounded-lg font-semibold mt-7"
            >
                Nuevo
            </button>
        </div>
        <ResumesTable />
    </div>
</template>
