<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';
import { fetchProducts, type Product } from '@/api/products';

const route = useRoute();
const router = useRouter();

const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// Локальные стейты фильтров
const category = ref((route.query.category as string) || 'all');
const minPrice = ref(route.query.min ? Number(route.query.min) : 0);
const maxPrice = ref(route.query.max ? Number(route.query.max) : 200000);
const sort = ref((route.query.sort as string) || 'price-asc');
const search = ref((route.query.q as string) || '');

const categories = [
  { value: 'all', label: 'Все' },
  { value: 'sofas', label: 'Диваны' },
  { value: 'beds', label: 'Кровати' },
  { value: 'tables', label: 'Столы' },
  { value: 'storage', label: 'Хранение' },
];

const sortOptions = [
  { value: 'price-asc', label: 'Сначала дешевле' },
  { value: 'price-desc', label: 'Сначала дороже' },
  { value: 'new', label: 'Сначала новинки' },
];

// Когда фильтры меняются — обновляем URL (а он триггерит загрузку)
watch(
  () => ({ category: category.value, minPrice: minPrice.value, maxPrice: maxPrice.value, sort: sort.value, search: search.value }),
  (q) => {
    router.replace({
      query: {
        ...(q.category !== 'all' && { category: q.category }),
        ...(q.minPrice > 0 && { min: String(q.minPrice) }),
        ...(q.maxPrice < 200000 && { max: String(q.maxPrice) }),
        ...(q.sort !== 'price-asc' && { sort: q.sort }),
        ...(q.search && { q: q.search }),
      },
    });
  }
);

// Загрузка товаров
async function load() {
  loading.value = true;
  error.value = null;
  try {
    const params: Record<string, string> = {};
    if (category.value !== 'all') params.category = category.value;
    if (minPrice.value > 0) params.min = String(minPrice.value);
    if (maxPrice.value < 200000) params.max = String(maxPrice.value);
    params.sort = sort.value;
    if (search.value) params.q = search.value;
    products.value = await fetchProducts(params);
  } catch (e: any) {
    error.value = e.message || 'Ошибка загрузки';
  } finally {
    loading.value = false;
  }
}

// Триггерим загрузку при смене URL (и при первом заходе)
watch(() => route.query, load, { immediate: true });

function resetFilters() {
  category.value = 'all';
  minPrice.value = 0;
  maxPrice.value = 200000;
  sort.value = 'price-asc';
  search.value = '';
}

const resultLabel = computed(() => {
  if (loading.value) return 'Загружаем…';
  const n = products.value.length;
  if (n === 0) return 'Ничего не найдено';
  return `${n} ${n === 1 ? 'товар' : n < 5 ? 'товара' : 'товаров'}`;
});
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <h1 class="font-bold text-3xl text-stone-900 mb-2">Каталог мебели IDEA</h1>
      <p class="text-stone-500 mb-8">{{ resultLabel }}</p>

      <!-- Фильтры -->
      <div class="bg-white rounded-2xl border border-stone-200 p-5 md:p-6 mb-8 shadow-sm">
        <!-- Категории (пилюли) -->
        <div class="flex flex-wrap gap-2 mb-5">
          <button
            v-for="c in categories"
            :key="c.value"
            @click="category = c.value"
            :class="category === c.value
              ? 'bg-stone-900 text-white'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'"
            class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            {{ c.label }}
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Поиск -->
          <div>
            <label class="block text-xs font-medium text-stone-600 mb-1">Поиск</label>
            <input
              v-model="search"
              type="text"
              placeholder="Например, диван…"
              class="w-full px-4 py-2 rounded-lg border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <!-- Цена от -->
          <div>
            <label class="block text-xs font-medium text-stone-600 mb-1">Цена от</label>
            <input
              v-model.number="minPrice"
              type="number"
              step="1000"
              min="0"
              class="w-full px-4 py-2 rounded-lg border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <!-- Цена до -->
          <div>
            <label class="block text-xs font-medium text-stone-600 mb-1">Цена до</label>
            <input
              v-model.number="maxPrice"
              type="number"
              step="1000"
              min="0"
              class="w-full px-4 py-2 rounded-lg border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <!-- Сортировка + сброс -->
        <div class="flex items-center justify-between mt-5 gap-4 flex-wrap">
          <select
            v-model="sort"
            class="px-4 py-2 rounded-lg border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option v-for="o in sortOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
          </select>
          <button @click="resetFilters" class="text-sm text-stone-500 hover:text-stone-900 transition-colors">
            Сбросить фильтры
          </button>
        </div>
      </div>

      <!-- Состояния -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="i in 8" :key="i" class="aspect-[4/5] rounded-2xl bg-stone-100 animate-pulse"></div>
      </div>

      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p class="text-red-700 mb-3">{{ error }}</p>
        <button @click="load" class="bg-stone-900 text-white px-4 py-2 rounded-lg text-sm">Повторить</button>
      </div>

      <div v-else-if="products.length === 0" class="bg-white rounded-2xl border border-stone-200 p-12 text-center">
        <p class="text-stone-500 mb-4">По выбранным фильтрам ничего не нашлось</p>
        <button @click="resetFilters" class="bg-amber-500 text-stone-900 px-4 py-2 rounded-lg font-medium">
          Сбросить фильтры
        </button>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard v-for="p in products" :key="p._id" :product="p" />
      </div>
    </div>
  </section>
</template>