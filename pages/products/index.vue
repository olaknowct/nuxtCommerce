<script setup>
import { useProductStore } from '@/stores/productStore';
import { useFetch } from '@vueuse/core';

const router = useRouter();
const route = useRoute();
const store = useProductStore();

console.log(route.query.category);

if (route.query?.category !== 'all') {
  store.setSelectedCategory(route.query.category);
}
// let url;
const getProdutsEndpoint = 'https://fakestoreapi.com/products';
let fetchUrl = getProdutsEndpoint;

if (store.selectedCategory !== 'all') {
  fetchUrl = `https://fakestoreapi.com/products/category/${store.selectedCategory}`;
}

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

// watch(
//   () => store.selectedCategory,
//   (newCategory) => {
//     url =
//       newCategory == 'all'
//         ? getProdutsEndpoint
//         : `https://fakestoreapi.com/products/category/${newCategory}`;
//     console.log(url);
//     const { isFetching, error, data, isFinished } = useFetch(url, {
//       afterFetch(ctx) {
//         store.setItems(JSON.parse(ctx.data));
//       },
//     });
//     console.log(url, newCategory);
//   }
// );
// // fetching related
// let url = 'https://fakestoreapi.com/products';

// if (products.selectedCategory != 'all')
//   url = `https://fakestoreapi.com/products/category/${products.selectedCategory}`;
</script>
<template>
  <div>
    <SideNavigation />
    <h1>{{ store.selectedCategory }}</h1>
    <h1>{{ store.selectedItems }}</h1>
  </div>
</template>
