<script setup>
import { useProductStore } from '@/stores/productStore';
import { useFetch } from '@vueuse/core';
const store = useProductStore();
const { products, setItems, selectedCategory } = store;
let url = 'https://fakestoreapi.com/products';
const route = useRoute();
console.log(route.query);
console.log(products.selectedCategory);
console.log(products.categories);

const category = ref(products.selectedCategory);
console.log(category);

if (products.selectedCategory != 'all')
  url = `https://fakestoreapi.com/products/category/${products.selectedCategory}`;

watch(products.selectedCategory, () => {
  console.log('some changed', someGetter);
});

// if ( products.selectedCategory ==  )
// const { isFetching, error, data } = useFetch(url);
const { isFetching, error, data, isFinished } = useFetch(url, {
  afterFetch(ctx) {
    setItems(JSON.parse(ctx.data));
  },
});
</script>

<template>
  <section>
    <SideNavigation />

    <div class="text-7xl" v-if="isFetching || !isFinished">looooooooooooooding</div>
    <div class="text-7xl" v-else>
      <!-- <h1>{{ products.items }}</h1> -->
      <h1>{{ selectedCategory }}</h1>
      <!-- <h1>{{ countComputed }}</h1> -->
    </div>
  </section>
</template>
