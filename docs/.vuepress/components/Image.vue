<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
    light: {
        type: String,
        required: true
    },
    dark: {
        type: String,
        required: true
    },
    light_mobile: {
        type: String,
        required: false,
        default: ''
    },
    dark_mobile: {
        type: String,
        required: false,
        default: ''
    },
});

const isDark = ref(false);

onMounted(() => {
    isDark.value = document.documentElement.classList.contains('dark');

    let toggleThemeButton = document.querySelector('.toggle-color-mode-button');

    if (toggleThemeButton !== null) {
        toggleThemeButton.addEventListener('click', () => {
            isDark.value = !isDark.value;
        });
    }
});
</script>

<template>
    <div class="image-container my-3">
        <img :src="isDark ? props.dark : props.light" alt="img" class="d-desktop">
        <img :src="isDark 
                ? (props.dark_mobile != '' ? props.dark_mobile : props.dark) 
                : (props.light_mobile != '' ? props.light_mobile : props.light)" 
            alt="img" 
            class="d-mobile"
        >
    </div>
</template>

<style scoped>
    .d-desktop {
        display: block;
    }

    .d-mobile {
        display: none;
    }

    @media (max-width: 720px) {
        .d-desktop {
            display: none;
        }

        .d-mobile {
            display: block;
        }
    }

    .image-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>
