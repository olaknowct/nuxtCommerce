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

watch(
  () => products.value.selectedCategory,
  (newCategory) => {
    isFiltering.value = true;

    fetchUrl = newCategory == 'all' ? productsUrl : `${productsUrl}/category/${newCategory}`;

    const { isFetching, error, data, isFinished } = useFetch(fetchUrl, {
      afterFetch(ctx) {
        isFiltering.value = false;
        store.setItems(JSON.parse(ctx.data));
      },
    });

    router.push(`/products?category=${newCategory}`);
  }
);

watch(
  () => store.sortBy,
  (newSortBy) => {
    const items = [...products.items];

    if (store.sortBy === 'alphabetically') {
      store.setItems(items.sort((a, b) => a.title.localeCompare(b.title)));
    } else if (store.sortBy === 'pricing') {
      store.setItems(items.sort((a, b) => a.price - b.price));
    } else if (store.sortBy === 'rating') {
      store.setItems(items.sort((a, b) => b.rating.rate - a.rating.rate));
    } else {
      return items;
    }

    if (!route.query.category) return router.push(`/products?sortBy=${newSortBy}`);
    if (!route.query.sortBy) return router.push(`${route.fullPath}&sortBy=${newSortBy}`);
    router.push(`${route.path}?category=${route.query.category}&sortBy=${newSortBy}`);
  }
);
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
