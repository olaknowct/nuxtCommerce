<script setup>
import { useProductStore } from '@/stores/productStore';
const store = useProductStore();

defineProps(['cart']);
</script>
<template>
  <tr>
    <td class="px-10 py-10"><img class="h-20" :src="cart.image" :alt="cart.title" /></td>
    <td class="px-10">{{ cart.title }}</td>
    <td class="px-10">
      <span class="flex gap-4">
        <button class="border-2">&#60;</button>
        <span class="value underline">{{ cart.quantity }}</span>
        <button class="border-2">&#62;</button>
      </span>
    </td>
    <td class="px-10">{{ cart.price }}</td>
    <td class="px-10">{{ cart.price * cart.quantity }}</td>
  </tr>
</template>
