<script setup lang="ts">
const API = import.meta.env.VITE_API_URL || '';
import { ref } from 'vue';

const cards = [
  { icon: '📞', label: 'Телефон', value: '8 (800) 200-45-45', href: 'tel:88002004545' },
  { icon: '✉️', label: 'Почта', value: 'hello@idea-home.ru', href: 'mailto:hello@idea-home.ru' },
  { icon: '📍', label: 'Шоурум', value: 'Москва, Ленинградский пр-т, 47' },
  { icon: '🕐', label: 'Режим работы', value: 'Ежедневно 10:00–21:00' },
];

const form = ref({ name: '', phone: '', message: '' });
const sending = ref(false);
const sent = ref(false);
const error = ref('');

async function submit() {
  error.value = '';
  if (form.value.name.trim().length < 2 || form.value.phone.trim().length < 10) {
    error.value = 'Проверьте имя и телефон';
    return;
  }
  sending.value = true;
  try {
    const res = await fetch(`${API}/api/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form.value, website: '' }),
    });
    if (!res.ok) throw new Error('server error');
    sent.value = true;
  } catch {
    error.value = 'Не получилось отправить. Попробуйте ещё раз.';
  } finally {
    sending.value = false;
  }
}
</script>

<template>
  <!-- Шапка -->
  <section class="bg-stone-900 py-20">
    <div class="container mx-auto px-4 text-center">
      <h1 class="font-extrabold text-4xl md:text-5xl text-white mb-4">Контакты</h1>
      <p class="text-stone-300 max-w-2xl mx-auto text-lg">
        Позвоните, напишите или приходите в шоурум — мы всегда на связи.
      </p>
    </div>
  </section>

  <section class="py-16">
    <div class="container mx-auto px-4">
      <!-- Карточки контактов -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div v-for="c in cards" :key="c.label" class="bg-white rounded-2xl border border-stone-200 p-6 text-center shadow-sm">
          <div class="text-3xl mb-3">{{ c.icon }}</div>
          <div class="text-sm text-stone-500 mb-1">{{ c.label }}</div>
          <template v-if="c.href">
            <a :href="c.href" class="font-semibold text-stone-900 hover:text-amber-600 transition-colors">{{ c.value }}</a>
          </template>
          <template v-else>
            <div class="font-semibold text-stone-900">{{ c.value }}</div>
          </template>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-10 items-start">
        <!-- Форма -->
        <div class="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm">
          <h2 class="font-bold text-2xl text-stone-900 mb-2">Оставить заявку</h2>
          <p class="text-stone-500 text-sm mb-6">Перезвоним в течение 15 минут в рабочее время.</p>

          <template v-if="!sent">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-stone-700 mb-1">Ваше имя</label>
                <input v-model="form.name" type="text" placeholder="Иван Иванов"
                  class="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-stone-700 mb-1">Телефон</label>
                <input v-model="form.phone" type="tel" placeholder="+7 (___) ___-__-__"
                  class="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-stone-700 mb-1">Сообщение</label>
                <textarea v-model="form.message" rows="4" placeholder="Например: подбираю диван до 60 000 ₽"
                  class="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"></textarea>
              </div>

              <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                {{ error }}
              </div>

              <button @click="submit" :disabled="sending"
                class="w-full bg-amber-500 text-stone-900 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors disabled:opacity-50">
                {{ sending ? 'Отправляем…' : 'Отправить заявку' }}
              </button>
            </div>
          </template>

          <div v-else class="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
            <div class="text-emerald-700 font-semibold mb-1">✓ Заявка отправлена</div>
            <div class="text-emerald-600 text-sm">Мы свяжемся с вами в ближайшее время.</div>
          </div>
        </div>

        <!-- Карта -->
        <div class="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
          <div class="p-6 md:p-8 border-b border-stone-200">
            <h2 class="font-bold text-2xl text-stone-900 mb-2">Как нас найти</h2>
            <p class="text-stone-500 text-sm">Москва, Ленинградский пр-т, 47 — 5 минут от м. «Динамо».</p>
          </div>
          <iframe
            src="https://yandex.ru/map-widget/v1/?text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD%D0%B3%D1%80%D0%B0%D0%B4%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%2C%2047&z=16"
            class="w-full h-[420px] block"
            loading="lazy"
            title="Шоурум IDEA на карте"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>