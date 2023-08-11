<script setup>
import { useProductStore } from '@/stores/productStore';
const store = useProductStore();
</script>
<template>
  <header class="shadow-md">
    <div class="max-w-7xl py-8 px-4 flex justify-between align-center mx-auto">
      <NuxtLink
        class="text-5xl font-bold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-950"
        to="/"
        >NuxtCommerce</NuxtLink
      >
      <nav class="flex self-end">
        <ul class="flex justify-between gap-10 text-lg items-center">
          <li class="">
            <NuxtLink class="" to="/">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/products">Products</NuxtLink>
          </li>
          <li class="flex items-center justify-center">
            <NuxtLink to="/cart"><Icon name="🛒" color="black" class="self-center" /></NuxtLink>
            <span class="bg-red-500 rounded-full px-1 text-white text-sm self-start">{{
              store.cartTotalCount
            }}</span>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
