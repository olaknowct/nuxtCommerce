<script setup>
import { useProductStore } from '@/stores/productStore';
import { useFetch } from '@vueuse/core';

const router = useRouter();
const route = useRoute();
const store = useProductStore();
const getProdutsEndpoint = 'https://fakestoreapi.com/products';
let fetchUrl = getProdutsEndpoint;

if (route.query.category) store.setSelectedCategory(route.query.category);
if (route.query.sortBy) store.setSortBy(route.query.sortBy);

if (store.selectedCategory !== 'all')
  fetchUrl = `https://fakestoreapi.com/products/category/${store.selectedCategory}`;

const { isFetching, error, data, isFinished } = useFetch(fetchUrl, {
  afterFetch(ctx) {
    store.setItems(JSON.parse(ctx.data));
  },
});

watch(
  () => store.selectedCategory,
  (newCategory) => {
    fetchUrl =
      newCategory == 'all'
        ? getProdutsEndpoint
        : `https://fakestoreapi.com/products/category/${newCategory}`;

    const { isFetching, error, data, isFinished } = useFetch(fetchUrl, {
      afterFetch(ctx) {
        store.setItems(JSON.parse(ctx.data));
      },
    });

    router.push(`/products?category=${newCategory}`);
  }
);

watch(
  () => store.sortBy,
  (newSortBy) => {
    const items = [...store.selectedItems];

    console.log(items);
    console.log(store.sortBy);

    if (store.sortBy === 'alphabetically') {
      console.log(items.sort((a, b) => a.title.localeCompare(b.title)));
    } else if (store.sortBy === 'pricing') {
      console.log(items.sort((a, b) => a.price - b.price));
    } else if (store.sortBy === 'rating') {
      console.log(items.sort((a, b) => b.rating.rate - a.rating.rate));
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
  <div>
    <SideNavigation />
    <h1>{{ store.selectedCategory }}</h1>
    <h1>{{ store.selectedItems }}</h1>
  </div>
</template>
