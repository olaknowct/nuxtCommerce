<template>
  <header class="bg-slate-50 px-20 py-8 flex justify-between">
    <NuxtLink class="text-2xl" to="/">NuxtCommerce</NuxtLink>
    <nav>
      <ul class="flex justify-between gap-10 text-lg items-center">
        <li class="">
          <NuxtLink class="" to="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/products">Products</NuxtLink>
        </li>
        <li class="flex">
          <NuxtLink to="/cart"><Icon name="🛒" color="black" class="self-center" /></NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
