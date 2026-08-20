<script setup lang="ts">
import { ref } from 'vue';

const mobileOpen = ref(false);

const links = [
  { to: '/', label: 'Главная' },
  { to: '/catalog', label: 'Каталог' },
  { to: '/about', label: 'О нас' },
  { to: '/contacts', label: 'Контакты' },
];
</script>

<template>
  <header class="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
    <!-- Top bar -->
    <div class="bg-stone-900 text-stone-100">
      <div class="container mx-auto flex items-center justify-between px-4 py-2 text-sm">
        <span>Доставка и сборка мебели по всей России</span>
        <a href="tel:88002004545" class="font-semibold hover:text-amber-400 transition-colors">
          8 (800) 200-45-45
        </a>
      </div>
    </div>

    <!-- Main nav -->
    <div class="container mx-auto flex items-center justify-between px-4 py-3">
      <RouterLink to="/" class="flex items-center gap-3">
        <div class="w-11 h-11 rounded-lg bg-white border border-stone-200 shadow-sm flex items-center justify-center overflow-hidden">
          <img src="/images/logo.png" alt="IDEA" class="w-full h-full object-contain scale-125 mix-blend-multiply" />
        </div>
        <div>
          <span class="font-extrabold text-2xl tracking-tight text-stone-900 block leading-none">IDEA</span>
          <span class="text-xs text-stone-500">мебель для дома</span>
        </div>
      </RouterLink>

      <nav class="hidden md:flex items-center gap-1">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to" v-slot="{ href, navigate, isExactActive }" custom>
          <a
            :href="href"
            @click="navigate"
            :class="isExactActive
              ? 'px-4 py-2 rounded-md text-sm font-medium bg-amber-500 text-stone-900'
              : 'px-4 py-2 rounded-md text-sm font-medium text-stone-700 hover:bg-amber-100 transition-colors'"
          >
            {{ link.label }}
          </a>
        </RouterLink>
      </nav>

      <button class="md:hidden p-2 text-stone-700" @click="mobileOpen = !mobileOpen">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path v-if="!mobileOpen" stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" d="M6 6l12 12M6 18L18 6" />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <nav v-if="mobileOpen" class="md:hidden border-t border-stone-200 bg-white">
      <div class="container mx-auto px-4 py-3 flex flex-col gap-1">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to" v-slot="{ href, navigate, isExactActive }" custom>
          <a
            :href="href"
            @click="navigate(); mobileOpen = false"
            :class="isExactActive
              ? 'px-4 py-3 rounded-md text-sm font-medium bg-amber-500 text-stone-900'
              : 'px-4 py-3 rounded-md text-sm font-medium text-stone-700 hover:bg-amber-100'"
          >
            {{ link.label }}
          </a>
        </RouterLink>
      </div>
    </nav>
  </header>
</template>