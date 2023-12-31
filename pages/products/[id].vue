<script setup>
import { useProductStore } from '@/stores/productStore';
import { productsUrl } from '@/utils/api/productsEndpoints.js';
import { useFetch } from '@vueuse/core';
import { storeToRefs } from 'pinia';

const route = useRoute();
const store = useProductStore();
const { products } = storeToRefs(store);

const count = ref(1);

const fetchUrl = `${productsUrl}/${route.params.id}`;

const { isFetching, error, data, isFinished } = useFetch(fetchUrl, {
  afterFetch(ctx) {
    store.setSelectedProduct(JSON.parse(ctx.data));
  },
});

const decreaseCount = () => {
  if (count.value <= 1) return;
  count.value--;
};

const addItemToCart = (product, quantity) => {
  const item = { ...product, quantity };
  count.value = 1;
  store.addItemToCart(item);
};
</script>
<template>
  <section class="max-w-7xl mx-auto">
    <div v-if="!isFinished">
      <svg class="animate-spin h-5 w-5 mr-3 bg-green-400 ..." viewBox="0 0 24 24">
        <!-- ... -->
      </svg>
    </div>
    <div class="flex flex-col md:flex-row shadow-md md:p-0 px-10" v-else>
      <div class="bg-white flex justify-center items-center py-10 px-10">
        <img
          :src="products.selectedProduct?.image"
          class="w-[30rem] items-center"
          :alt="products.selectedProduct?.name"
        />
      </div>
      <div class="px-10 py-16">
        <div class="max-w-xl flex flex-col gap-2">
          <h1 class="font-bold text-xl">{{ products.selectedProduct?.title }}</h1>
          <h2>Description:</h2>
          <p>{{ products.selectedProduct?.description }}</p>
          <span class="font-semibold">Rating : {{ products.selectedProduct.rating.rate }}</span>
          <span class="flex gap-4 mt-6 justify-center">
            <button class="border-2" @click="decreaseCount()">&#60;</button>
            <span class="value underline">{{ count }}</span>
            <button class="border-2" @click="count++">&#62;</button>
          </span>
          <button
            @click="addItemToCart(products.selectedProduct, count)"
            class="mt-4 rounded-md shadow-lg bg-green-700 text-white px-7 py-2 hover:translate-y-[1px] active:-translate-y-[1px] transition duration-0 hover:duration-50"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
