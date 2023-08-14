<script setup>
import { useProductStore } from '@/stores/productStore';
import { storeToRefs } from 'pinia';
const store = useProductStore();

const { products } = storeToRefs(store);

defineProps(['category']);
</script>
<template>
  <li class="flex gap-3">
    <input
      :id="category"
      :name="'category'"
      type="radio"
      :value="category"
      v-model="products.selectedCategory"
    />
    <label :for="category">{{ category.charAt(0).toUpperCase() + category.slice(1) }}</label>
    <!-- <NuxtLink class="rounded-xl bg-red-300" :to="`/products/${category}`" noPrefetch>{{
      category
    }}</NuxtLink> -->
  </li>
</template>
