<script setup>
import { useProductStore } from '@/stores/productStore';
const store = useProductStore();

defineProps(['category']);
</script>
<template>
  <div class="max-w-5xl flex divide-y flex-col mx-auto">
    <table class="table-auto class">
      <thead class="">
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody class="mt-4">
        <CartList v-for="(item, index) in store.cartItems" :key="index" :cart="item" />
      </tbody>
    </table>
    <span class="self-end">Cart Total {{ store.cartTotal }} </span>
  </div>
</template>
