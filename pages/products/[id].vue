<script setup>
import { useProductStore } from '@/stores/productStore';
import { productsUrl } from '@/utils/api/productsEndpoints.js';
import { useFetch } from '@vueuse/core';

const route = useRoute();
const store = useProductStore();

const fetchUrl = `${productsUrl}/${route.params.id}`;

const { isFetching, error, data, isFinished } = useFetch(fetchUrl, {
  afterFetch(ctx) {
    store.setSelectedProduct(JSON.parse(ctx.data));
  },
});
</script>
<template>
  <section>
    <div v-if="isFetching && !isFinished">
      <svg class="animate-spin h-5 w-5 mr-3 bg-green-400 ..." viewBox="0 0 24 24">
        <!-- ... -->
      </svg>
    </div>
    <!-- <div v-else>slug is : {{ store.selectedProduct }}</div> -->
    <div class="max-w-7xl mx-auto flex flex-row shadow-md" v-else>
      <div class="bg-white flex justify-center items-center py-10 px-10">
        <img
          :src="store.selectedProduct.image"
          class="w-[30rem] items-center"
          :alt="store.selectedProduct.name"
        />
      </div>
      <div class="px-10 py-16">
        <div class="max-w-xl flex flex-col gap-2">
          <h1 class="font-bold text-xl">{{ store.selectedProduct.title }}</h1>
          <h2>Description:</h2>
          <p>{{ store.selectedProduct.description }}</p>
          <span class="font-semibold">Rating : {{ store.selectedProduct.rating.rate }}</span>
          <span class="flex gap-4 mt-6 justify-center"
            ><button class="border-2">&#60;</button>
            <span class="value underline">1</span>
            <button class="border-2">&#62;</button>
          </span>
          <button
            @click=""
            class="mt-4 rounded-md shadow-lg bg-green-700 text-white px-7 py-2 hover:translate-y-[1px] active:-translate-y-[1px] transition duration-0 hover:duration-50"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
