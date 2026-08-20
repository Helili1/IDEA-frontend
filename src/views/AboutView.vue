<script setup lang="ts">
const stats = [
  { value: '7', label: 'лет делаем дома уютными' },
  { value: '12 000+', label: 'семей обустроились с IDEA' },
  { value: '3', label: 'шоурума в Москве' },
  { value: '98%', label: 'клиентов рекомендуют нас' },
];

const timeline = [
  { year: '2019', title: 'Начало', text: 'Открыли первый шоурум на 40 м² и продавали мебель трёх скандинавских фабрик.' },
  { year: '2021', title: 'Своё производство', text: 'Запустили цех корпусной мебели — так появились честные цены и гарантия 5 лет.' },
  { year: '2023', title: 'Доставка по России', text: 'Подключили собственную логистику: привозим и собираем в 80+ городах.' },
  { year: '2026', title: 'IDEA сегодня', text: '24 модели в четырёх коллекциях, служба сборки и сервис без очередей.' },
];

const values = [
  { icon: '🌿', title: 'Честные материалы', desc: 'Массив дуба, берёзы и ореха, ткани без вредных пропиток — сертификаты покажем по запросу.' },
  { icon: '📐', title: 'Продуманный дизайн', desc: 'Каждая модель проходит 12 итераций и испытания в реальных квартирах, прежде чем попасть в каталог.' },
  { icon: '🤝', title: 'Сервис без нервов', desc: 'Доставка в слот до 2 часов, сборка в день доставки, вывоз упаковки — всё включено в цену.' },
  { icon: '♻️', title: 'Ответственность', desc: 'Упаковка из переработанных материалов и программа trade-in: заберём старую мебель при доставке новой.' },
];
</script>

<template>
  <!-- Шапка страницы -->
  <section class="bg-stone-900 py-20">
    <div class="container mx-auto px-4 text-center">
      <h1 class="font-extrabold text-4xl md:text-5xl text-white mb-4">О нас</h1>
      <p class="text-stone-300 max-w-2xl mx-auto text-lg">
        IDEA — это мебель, с которой дом становится домом. Рассказываем, кто мы и почему нам можно доверять.
      </p>
    </div>
  </section>

  <!-- Кто мы + миссия -->
  <section class="py-16 md:py-20">
    <div class="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 class="font-bold text-3xl text-stone-900 mb-6">Кто мы</h2>
        <p class="text-stone-700 leading-relaxed mb-4">
          <strong>IDEA</strong> — российский бренд мебели в скандинавском стиле. Мы начинали с маленького
          шоурума, а сегодня у нас собственное производство, три шоурума в Москве и доставка по всей стране.
        </p>
        <p class="text-stone-600 leading-relaxed mb-4">
          Мы делаем мебель из массива дуба, берёзы и ореха, работаем с проверенными фабриками тканей
          и даём 5 лет гарантии на каркас и механизмы.
        </p>
        <p class="text-stone-600 leading-relaxed">
          В каталоге — четыре коллекции: диваны, кровати, столы и системы хранения.
          Никаких случайных товаров: каждую модель отбирают дизайнеры.
        </p>
      </div>
      <div class="bg-stone-900 rounded-3xl p-8 md:p-10">
        <div class="text-amber-400 text-5xl leading-none mb-4">❝</div>
        <h3 class="font-bold text-2xl text-white mb-4">Наша миссия</h3>
        <p class="text-stone-300 leading-relaxed">
          Делать качественный дизайн доступным: чтобы красивый и удобный дом не был привилегией,
          а стал нормой для каждой семьи.
        </p>
      </div>
    </div>
  </section>

  <!-- Цифры -->
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="font-bold text-3xl text-stone-900 text-center mb-12">IDEA в цифрах</h2>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="s in stats" :key="s.label" class="bg-stone-50 rounded-2xl p-6 text-center border border-stone-200">
          <div class="font-extrabold text-3xl md:text-4xl text-stone-900 mb-2">{{ s.value }}</div>
          <div class="text-sm text-stone-500">{{ s.label }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- История -->
  <section class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="font-bold text-3xl text-stone-900 text-center mb-12">Как мы росли</h2>
      <div class="max-w-2xl mx-auto relative">
        <div class="absolute left-[7px] top-1 bottom-1 w-0.5 bg-stone-200"></div>
        <div v-for="t in timeline" :key="t.year" class="relative pl-10 pb-10 last:pb-0">
          <div class="absolute left-0 top-1 w-4 h-4 rounded-full bg-amber-500 ring-4 ring-stone-50"></div>
          <div class="text-amber-600 font-bold text-sm mb-1">{{ t.year }}</div>
          <h3 class="font-semibold text-lg text-stone-900 mb-2">{{ t.title }}</h3>
          <p class="text-stone-600 text-sm leading-relaxed">{{ t.text }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Принципы -->
  <section class="py-16 bg-stone-100">
    <div class="container mx-auto px-4">
      <h2 class="font-bold text-3xl text-stone-900 text-center mb-12">Наши принципы</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="v in values" :key="v.title" class="bg-white rounded-2xl p-6 text-center shadow-sm border border-stone-200">
          <div class="text-4xl mb-3">{{ v.icon }}</div>
          <h3 class="font-semibold text-stone-900 mb-2">{{ v.title }}</h3>
          <p class="text-sm text-stone-600">{{ v.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-16">
    <div class="container mx-auto px-4">
      <div class="bg-stone-900 rounded-3xl p-8 md:p-12 text-center">
        <h2 class="font-bold text-3xl text-white mb-4">Хотите посмотреть мебель вживую?</h2>
        <p class="text-stone-300 mb-8 max-w-lg mx-auto">
          Приходите в шоурум — покажем материалы, дадим посидеть на всех диванах и угостим кофе.
        </p>
        <RouterLink to="/contacts" class="inline-flex items-center gap-2 bg-amber-500 text-stone-900 px-8 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors">
          Записаться в шоурум →
        </RouterLink>
      </div>
    </div>
  </section>
</template>