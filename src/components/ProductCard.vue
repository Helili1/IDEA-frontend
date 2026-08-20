<script setup lang="ts">
import type { Product } from '@/api/products';

defineProps<{ product: Product }>();

const categoryLabel: Record<string, string> = {
  sofas: 'Диваны',
  beds: 'Кровати',
  tables: 'Столы',
  storage: 'Хранение',
};
</script>

<template>
  <RouterLink
    :to="`/product/${product.slug}`"
    class="group bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden block"
  >
    <div class="aspect-[4/3] bg-stone-100 overflow-hidden relative">
      <img
        :src="product.image || '/images/hero.jpg'"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div class="absolute top-3 left-3 flex gap-2">
        <span v-if="product.isNewItem" class="bg-amber-500 text-stone-900 text-xs font-bold px-2.5 py-1 rounded-full">
          Новинка
        </span>
        <span v-if="product.isHit" class="bg-stone-900 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full">
          Хит
        </span>
      </div>
      <span class="absolute top-3 right-3 bg-white/90 backdrop-blur text-stone-700 text-xs px-2 py-1 rounded-full">
        {{ categoryLabel[product.category] }}
      </span>
    </div>
    <div class="p-5">
      <div class="text-xs text-stone-400 mb-1">{{ product.article }}</div>
      <h3 class="font-semibold text-stone-900 mb-3 group-hover:text-amber-600 transition-colors">
        {{ product.name }}
      </h3>
      <div class="flex items-baseline gap-2 mb-4">
        <span class="font-bold text-xl text-stone-900">
          {{ product.price.toLocaleString('ru-RU') }} ₽
        </span>
        <span v-if="product.oldPrice" class="text-sm text-stone-400 line-through">
          {{ product.oldPrice.toLocaleString('ru-RU') }} ₽
        </span>
      </div>
      <span class="inline-flex items-center gap-1 text-sm font-medium text-amber-600 group-hover:gap-2 transition-all">
        Подробнее →
      </span>
    </div>
  </RouterLink>
</template>