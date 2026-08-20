<template>
  <footer class="bg-stone-900 text-stone-300">
    <div class="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-lg bg-white flex items-center justify-center overflow-hidden">
            <img src="/images/logo.png" alt="IDEA" class="w-full h-full object-contain scale-125 mix-blend-multiply" />
          </div>
          <span class="font-extrabold text-xl text-white">IDEA</span>
        </div>
        <p class="text-sm leading-relaxed text-stone-400">
          Мебель в скандинавском стиле: диваны, кровати, столы и системы хранения.
          Доставка и сборка по всей России.
        </p>
      </div>

      <div>
        <h3 class="font-bold text-white mb-4">Навигация</h3>
        <ul class="space-y-2 text-sm">
          <li><RouterLink to="/catalog" class="hover:text-amber-400 transition-colors">Каталог</RouterLink></li>
          <li><RouterLink to="/about" class="hover:text-amber-400 transition-colors">О нас</RouterLink></li>
          <li><RouterLink to="/contacts" class="hover:text-amber-400 transition-colors">Контакты</RouterLink></li>
        </ul>
      </div>

      <div>
        <h3 class="font-bold text-white mb-4">Контакты</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="tel:88002004545" class="hover:text-amber-400 transition-colors">8 (800) 200-45-45</a></li>
          <li><a href="mailto:hello@idea-home.ru" class="hover:text-amber-400 transition-colors">hello@idea-home.ru</a></li>
          <li>Москва, Ленинградский пр-т, 47</li>
        </ul>
      </div>
    </div>
    <div class="border-t border-stone-700 py-5 text-center text-xs text-stone-500">
      © 2026 IDEA. Учебный портфолио-проект.
    </div>
  </footer>
</template>