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

computed(() => {
  const items = [...products.value.items];
  let sortedItems;

  switch (products.value.sortBy) {
    case 'alphabetically':
      sortedItems = items.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'pricing':
      sortedItems = items.sort((a, b) => a.price - b.price);
      break;
    case 'rating':
      sortedItems = items.sort((a, b) => b.rating.rate - a.rating.rate);
      break;
    default:
    // code block
  }

  store.setItems(sortedItems);

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
