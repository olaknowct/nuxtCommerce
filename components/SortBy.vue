<script setup>
import { useProductStore } from '@/stores/productStore';
const store = useProductStore();
const route = useRoute();
const router = useRouter();

console.log(`${route.fullPath}&sortBy=${store.sortBy}`);
const { products } = store;
</script>

<template>
  <div class="form-control">
    <label for="sortBy">Sort By</label>
    <select id="sortBy" name="sortBy" v-model="products.sortBy">
      <option value="alphabetically">Alphabetically</option>
      <option value="pricing">Pricing</option>
      <option value="rating">Rating</option>
    </select>
  </div>
</template>
