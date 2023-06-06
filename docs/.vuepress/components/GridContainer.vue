<script setup lang="ts">
// Quickly grid up some elements with this component in markdown.

const props = defineProps({
    rows: {
        type: Number,
        default: 1
    },
    cols: {
        type: Number,
        default: 1
    },
    gap: {
        type: String,
        default: '1rem'
    }
});
</script>

<template>
    <div :style="`display: grid; grid-template-columns: repeat(${props.cols}, 1fr); grid-template-rows: repeat(${props.rows}, 1fr); gap: ${props.gap}`">
        <slot></slot>
    </div>
</template>
