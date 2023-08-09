import { defineStore } from 'pinia';

export const useProductStore = defineStore('products', () => {
  const products = ref({
    items: [],
    categories: [],
    count: 4,
    selectedCategory: 'all',
  });

  const setItems = (items) => {
    products.value.items = items;
  };

  const setCategories = (categories) => {
    products.value.categories = ['all', ...categories];
  };

  const selectedCategory = computed(() => {
    return products.value.selectedCategory;
  });

  // const countComputed = computed(() => {
  //   return products.value.count + 1;
  // });

  return { products, setItems, setCategories, selectedCategory };
});
