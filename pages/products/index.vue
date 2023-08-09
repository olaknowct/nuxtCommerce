<script setup>
import { useProductStore } from '@/stores/productStore';
import { useFetch } from '@vueuse/core';

const router = useRouter();
const route = useRoute();
const store = useProductStore();
const getProdutsEndpoint = 'https://fakestoreapi.com/products';
let fetchUrl = getProdutsEndpoint;

if (route.query.category) store.setSelectedCategory(route.query.category);

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
</script>
<template>
  <div>
    <SideNavigation />
    <h1>{{ store.selectedCategory }}</h1>
    <h1>{{ store.selectedItems }}</h1>
  </div>
</template>
