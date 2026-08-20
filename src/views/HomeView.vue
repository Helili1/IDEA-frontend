<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import { fetchProducts, type Product } from '@/api/products';

const hits = ref<Product[]>([]);
const loading = ref(true);

const categories = [
  { slug: 'sofas', label: 'Диваны', image: '/images/sofa.jpg', desc: 'Мягкие, вместительные, для всей семьи' },
  { slug: 'beds', label: 'Кровати', image: '/images/bed.jpg', desc: 'Массив дерева, тихое основание, крепкий сон' },
  { slug: 'tables', label: 'Столы и стулья', image: '/images/table.jpg', desc: 'Обеденные зоны и рабочие места' },
  { slug: 'storage', label: 'Хранение', image: '/images/storage.jpg', desc: 'Стеллажи, шкафы и системы' },
];

const advantages = [
  { icon: '🛡️', title: 'Гарантия 5 лет', desc: 'На каркас и механизмы всей мебели' },
  { icon: '🚚', title: 'Доставка 1–3 дня', desc: 'По Москве и области — подъём в квартиру' },
  { icon: '🔧', title: 'Сборка под ключ', desc: 'Мастер соберёт и вывезет упаковку' },
  { icon: '💰', title: 'Честные цены', desc: 'Своё производство — без наценки посредников' },
];

onMounted(async () => {
  try {
    const all = await fetchProducts();
    // Хиты + новинки, максимум 4 штуки
    hits.value = all
      .filter((p) => p.isHit || p.isNewItem)
      .slice(0, 4);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <!-- Hero -->
  <section class="relative h-[600px] md:h-[700px] overflow-hidden">
    <img src="/images/hero.jpg" alt="Скандинавский интерьер" class="absolute inset-0 w-full h-full object-cover" />
    <div class="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/50 to-transparent"></div>
    <div class="relative container mx-auto px-4 h-full flex items-center">
      <div class="max-w-xl">
        <h1 class="font-extrabold text-4xl md:text-5xl text-white leading-tight mb-4">
          Мебель, с которой дом становится домом
        </h1>
        <p class="text-white/90 text-lg mb-8 leading-relaxed">
          Скандинавский стиль, честные цены и сборка под ключ.
          Доставим за 1–3 дня в любой город России.
        </p>
        <div class="flex flex-wrap gap-4">
          <RouterLink to="/catalog" class="inline-flex items-center gap-2 bg-amber-500 text-stone-900 px-6 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors">
            Открыть каталог →
          </RouterLink>
          <RouterLink to="/contacts" class="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold border border-white/30 hover:bg-white/20 backdrop-blur transition-colors">
            Связаться с нами
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <!-- Категории -->
  <section class="py-16 md:py-20">
    <div class="container mx-auto px-4">
      <h2 class="font-bold text-3xl text-stone-900 text-center mb-3">Наши коллекции</h2>
      <p class="text-stone-500 text-center mb-12 max-w-2xl mx-auto">
        Четыре направления мебели, продуманные до мелочей
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <RouterLink
          v-for="cat in categories"
          :key="cat.slug"
          :to="`/catalog?category=${cat.slug}`"
          class="group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
        >
          <img :src="cat.image" :alt="cat.label" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 class="font-bold text-xl mb-1">{{ cat.label }}</h3>
            <p class="text-sm text-white/80">{{ cat.desc }}</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- Хиты -->
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <h2 class="font-bold text-3xl text-stone-900 mb-2">Популярное</h2>
          <p class="text-stone-500">Товары, которые выбирают чаще всего</p>
        </div>
        <RouterLink to="/catalog" class="text-amber-600 font-semibold hover:text-amber-700 transition-colors">
          Весь каталог →
        </RouterLink>
      </div>

      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="i in 4" :key="i" class="aspect-[4/5] rounded-2xl bg-stone-100 animate-pulse"></div>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard v-for="p in hits" :key="p._id" :product="p" />
      </div>
    </div>
  </section>

  <!-- Преимущества -->
  <section class="py-16 bg-stone-100">
    <div class="container mx-auto px-4">
      <h2 class="font-bold text-3xl text-stone-900 text-center mb-12">Почему выбирают IDEA</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="a in advantages" :key="a.title" class="bg-white rounded-2xl p-6 text-center shadow-sm border border-stone-200">
          <div class="text-4xl mb-3">{{ a.icon }}</div>
          <h3 class="font-semibold text-stone-900 mb-2">{{ a.title }}</h3>
          <p class="text-sm text-stone-600">{{ a.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-16">
    <div class="container mx-auto px-4">
      <div class="bg-stone-900 rounded-3xl p-8 md:p-12 text-center">
        <h2 class="font-bold text-3xl text-white mb-4">Нужна консультация?</h2>
        <p class="text-stone-300 mb-8 max-w-lg mx-auto">
          Менеджер подберёт мебель под ваш бюджет и интерьер. Ответим за 15 минут в рабочее время.
        </p>
        <RouterLink to="/contacts" class="inline-flex items-center gap-2 bg-amber-500 text-stone-900 px-8 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors">
          Оставить заявку →
        </RouterLink>
      </div>
    </div>
  </section>
</template>