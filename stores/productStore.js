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

  const setSelectedCategory = (category) => {
    products.value.selectedCategory = category;
  };

  const selectedCategory = computed(() => {
    return products.value.selectedCategory;
  });

  const selectedItems = computed(() => {
    return products.value.items;
  });

  // const countComputed = computed(() => {
  //   return products.value.count + 1;
  // });

  return {
    products,
    setItems,
    setCategories,
    selectedCategory,
    selectedItems,
    setSelectedCategory,
  };
});

// export const useProductStore = defineStore('products', {
//   state: () => ({
//     items: [],
//     categories: [],
//     count: 4,
//     selectedCategory: 'all',
//   }),
//   // getters: {
//   //   doubleCount: (state) => state.count * 2,
//   // },
//   actions: {
//     setItems(productItems) {
//       this.items = productItems;
//     },
//     setCategories(categories) {
//       this.categories = ['all', ...categories];
//     },
//   },
// });
