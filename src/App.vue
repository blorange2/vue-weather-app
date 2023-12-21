<template>
    <div class="bg-weather-primary flex min-h-screen flex-col">
        <SiteNavigation />
        <RouterView />
    </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import SiteNavigation from './components/SiteNavigation.vue'
</script>

<style lang="scss" scoped></style>
