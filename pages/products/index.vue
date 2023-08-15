<script setup>
import { useProductStore } from '@/stores/productStore';
import { useFetch } from '@vueuse/core';
import { productsUrl } from '@/utils/api/productsEndpoints.js';
import { storeToRefs } from 'pinia';

const router = useRouter();
const route = useRoute();
const store = useProductStore();
const { products } = storeToRefs(store);
let fetchUrl = productsUrl;

const isFiltering = ref(false);

// Filtering options
if (route.query.category) store.setSelectedCategory(route.query.category);
if (route.query.sortBy) store.setSortBy(route.query.sortBy);
if (products.value.selectedCategory !== 'all')
  fetchUrl = `${productsUrl}/category/${products.value.selectedCategory}`;

const { isFetching, error, data, isFinished } = useFetch(fetchUrl, {
  afterFetch(ctx) {
    store.setItems(JSON.parse(ctx.data));
  },
});

watchEffect(() => {
  isFiltering.value = true;

  fetchUrl =
    products.value.selectedCategory == 'all'
      ? productsUrl
      : `${productsUrl}/category/${products.value.selectedCategory}`;

  const { isFetching, error, data, isFinished } = useFetch(fetchUrl, {
    afterFetch(ctx) {
      isFiltering.value = false;
      store.setItems(JSON.parse(ctx.data));
    },
  });

  router.push(`/products?category=${products.value.selectedCategory}`);
});

watchEffect(() => {
  const items = [...products.value.items];

  if (products.value.sortBy === 'alphabetically') {
    store.setItems(items.sort((a, b) => a.title.localeCompare(b.title)));
  } else if (products.value.sortBy === 'pricing') {
    store.setItems(items.sort((a, b) => a.price - b.price));
  } else if (products.value.sortBy === 'rating') {
    store.setItems(items.sort((a, b) => b.rating.rate - a.rating.rate));
  } else {
    return items;
  }

  if (!route.query.category) return router.push(`/products?sortBy=${products.value.sortBy}`);
  if (!route.query.sortBy) return router.push(`${route.fullPath}&sortBy=${products.value.sortBy}`);
  router.push(`${route.path}?category=${route.query.category}&sortBy=${products.value.sortBy}`);
});
</script>
<template>
  <div class="flex flex-col md:flex-row max-w-6xl mx-auto xl:p-0 px-24 gap-10">
    <SideNavigation />
    <ProductCatalog
      class="grow"
      :isFetching="isFetching"
      :isFinished="isFinished"
      :isFiltering="isFiltering"
    />
  </div>
</template>
