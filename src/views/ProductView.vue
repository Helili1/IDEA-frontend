<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';
import { fetchProduct, fetchProducts, type Product } from '@/api/products';

const route = useRoute();
const router = useRouter();

const product = ref<Product | null>(null);
const related = ref<Product[]>([]);
const loading = ref(true);
const notFound = ref(false);

const categoryLabel: Record<string, string> = {
  sofas: 'Диваны',
  beds: 'Кровати',
  tables: 'Столы и стулья',
  storage: 'Хранение',
};

// Галерея: если images есть — используем, если нет — одно изображение
const gallery = computed(() => {
  if (!product.value) return [];
  const p = product.value as any;
  if (Array.isArray(p.images) && p.images.length) return p.images;
  return product.value.image ? [product.value.image] : ['/images/hero.jpg'];
});

const activeImage = ref(0);

const specs = computed(() => {
  if (!product.value) return [];
  const d = product.value.dimensions;
  return [
    ['Артикул', product.value.article],
    ['Материал', product.value.material],
    ['Цвета', product.value.colors?.join(', ')],
    d ? ['Размеры (Ш×В×Г)', `${d.width} × ${d.height} × ${d.depth} см`] : null,
    ['Наличие', product.value.inStock ? 'В наличии' : 'Под заказ'],
    ['Гарантия', '5 лет на каркас и механизмы'],
  ].filter((row): row is [string, string] => row !== null && Boolean(row[1]));
});

async function load() {
  loading.value = true;
  notFound.value = false;
  activeImage.value = 0;
  try {
    const slug = route.params.slug as string;
    product.value = await fetchProduct(slug);

    // Похожие товары: та же категория, но не этот товар
    const all = await fetchProducts({ category: product.value.category });
    related.value = all.filter((p) => p.slug !== slug).slice(0, 4);
  } catch {
    notFound.value = true;
  } finally {
    loading.value = false;
  }
}

watch(() => route.params.slug, load, { immediate: true });

// Форма заявки
const form = ref({ name: '', phone: '', message: '' });
const sending = ref(false);
const sent = ref(false);

async function submitOrder() {
  if (!form.value.name || !form.value.phone || sending.value) return;
  sending.value = true;
  try {
    await fetch('/api/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.value.name.trim(),
        phone: form.value.phone.trim(),
        message: form.value.message.trim(),
        productId: product.value?._id,
      }),
    });
    sent.value = true;
  } finally {
    sending.value = false;
  }
}
</script>

<template>
  <!-- Загрузка -->
  <section v-if="loading" class="py-12">
    <div class="container mx-auto px-4 grid md:grid-cols-2 gap-10">
      <div class="aspect-square rounded-2xl bg-stone-100 animate-pulse"></div>
      <div class="space-y-4">
        <div class="h-8 bg-stone-100 rounded animate-pulse w-2/3"></div>
        <div class="h-4 bg-stone-100 rounded animate-pulse w-1/3"></div>
        <div class="h-10 bg-stone-100 rounded animate-pulse w-1/2"></div>
      </div>
    </div>
  </section>

  <!-- 404 -->
  <section v-else-if="notFound" class="py-24 text-center">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold text-stone-900 mb-4">Товар не найден</h1>
      <p class="text-stone-500 mb-6">Возможно, его убрали из каталога</p>
      <RouterLink to="/catalog" class="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-stone-800 transition-colors">
        Вернуться в каталог
      </RouterLink>
    </div>
  </section>

  <!-- Товар -->
  <section v-else-if="product" class="py-10 md:py-16">
    <div class="container mx-auto px-4">
      <!-- Хлебные крошки -->
      <nav class="flex items-center gap-2 text-sm text-stone-500 mb-8 flex-wrap">
        <RouterLink to="/" class="hover:text-amber-600 transition-colors">Главная</RouterLink>
        <span>/</span>
        <RouterLink to="/catalog" class="hover:text-amber-600 transition-colors">Каталог</RouterLink>
        <span>/</span>
        <RouterLink :to="`/catalog?category=${product.category}`" class="hover:text-amber-600 transition-colors">
          {{ categoryLabel[product.category] }}
        </RouterLink>
        <span>/</span>
        <span class="text-stone-900">{{ product.name }}</span>
      </nav>

      <div class="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
        <!-- Галерея -->
        <div>
          <div class="aspect-square bg-white rounded-2xl border border-stone-200 overflow-hidden mb-4">
            <img :src="gallery[activeImage]" :alt="product.name" class="w-full h-full object-cover" />
          </div>
          <div v-if="gallery.length > 1" class="grid grid-cols-4 gap-3">
            <button
              v-for="(img, i) in gallery"
              :key="i"
              @click="activeImage = i"
              :class="activeImage === i ? 'ring-2 ring-amber-500' : 'ring-1 ring-stone-200'"
              class="aspect-square bg-white rounded-lg overflow-hidden transition-all"
            >
              <img :src="img" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Информация -->
        <div>
          <div class="flex flex-wrap gap-2 mb-3">
            <span v-if="product.isNewItem" class="bg-amber-500 text-stone-900 text-xs font-bold px-2.5 py-1 rounded-full">
              Новинка
            </span>
            <span v-if="product.isHit" class="bg-stone-900 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full">
              Хит
            </span>
            <span v-if="product.inStock" class="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
              В наличии
            </span>
          </div>

          <h1 class="font-bold text-3xl text-stone-900 mb-2">{{ product.name }}</h1>
          <div class="text-sm text-stone-500 mb-6">Артикул: {{ product.article }}</div>

          <p class="text-stone-700 leading-relaxed mb-8">{{ product.description }}</p>

          <!-- Цена -->
          <div class="bg-white rounded-2xl border border-stone-200 p-6 mb-8 shadow-sm">
            <div class="flex items-end justify-between gap-4 flex-wrap mb-6">
              <div>
                <div class="text-sm text-stone-500 mb-1">Цена</div>
                <div class="flex items-baseline gap-3">
                  <span class="font-bold text-3xl text-stone-900">
                    {{ product.price.toLocaleString('ru-RU') }} ₽
                  </span>
                  <span v-if="product.oldPrice" class="text-lg text-stone-400 line-through">
                    {{ product.oldPrice.toLocaleString('ru-RU') }} ₽
                  </span>
                </div>
              </div>
            </div>

            <!-- Форма заказа -->
            <template v-if="!sent">
              <div class="space-y-3">
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Ваше имя"
                  class="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  class="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <textarea
                  v-model="form.message"
                  rows="2"
                  placeholder="Комментарий (необязательно)"
                  class="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>
              <button
                @click="submitOrder"
                :disabled="sending"
                class="w-full mt-4 bg-amber-500 text-stone-900 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors disabled:opacity-50"
              >
                {{ sending ? 'Отправляем…' : 'Заказать этот товар' }}
              </button>
            </template>

            <div v-else class="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
              <div class="text-emerald-700 font-medium mb-1">✓ Заявка отправлена</div>
              <div class="text-emerald-600 text-sm">Мы свяжемся с вами в ближайшее время</div>
            </div>
          </div>

          <!-- Характеристики -->
          <div class="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
            <h2 class="font-semibold text-lg text-stone-900 px-6 py-4 border-b border-stone-200">
              Характеристики
            </h2>
            <dl>
              <div
                v-for="([label, value], i) in specs"
                :key="label"
                :class="['grid grid-cols-[1fr_1.5fr] gap-4 px-6 py-3 text-sm', i % 2 === 0 ? 'bg-white' : 'bg-stone-50']"
              >
                <dt class="text-stone-500">{{ label }}</dt>
                <dd class="text-stone-900 font-medium">{{ value }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <!-- Похожие товары -->
      <div v-if="related.length" class="mt-20">
        <div class="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <h2 class="font-bold text-2xl text-stone-900 mb-1">Похожие товары</h2>
            <p class="text-stone-500 text-sm">Из категории «{{ categoryLabel[product.category] }}»</p>
          </div>
          <RouterLink :to="`/catalog?category=${product.category}`" class="text-amber-600 font-medium hover:text-amber-700 transition-colors">
            Все в категории →
          </RouterLink>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard v-for="p in related" :key="p._id" :product="p" />
        </div>
      </div>
    </div>
  </section>
</template>