<script setup>
import { useProductStore } from '@/stores/productStore';
import { storeToRefs } from 'pinia';

const store = useProductStore();
const { products, cartTotal } = storeToRefs(store);

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
        <CartList v-for="(item, index) in products.cart" :key="index" :cart="item" />
      </tbody>
    </table>
    <span class="self-end">Cart Total {{ cartTotal }} </span>
  </div>
</template>
