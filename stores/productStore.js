import { defineStore } from 'pinia';

export const useProductStore = defineStore('products', () => {
  const products = ref({
    items: [],
    categories: [],
    count: 4,
    selectedCategory: 'all',
    sortBy: 'alphabetically',
    selectedProduct: null,
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
  const setSortBy = (sortBy) => {
    products.value.sortBy = sortBy;
  };

  const setSelectedProduct = (item) => {
    products.value.selectedProduct = item;
  };

  const selectedCategory = computed(() => {
    return products.value.selectedCategory;
  });

  const selectedItems = computed(() => {
    return products.value.items;
  });

  const selectedProduct = computed(() => {
    return products.value.selectedProduct;
  });

  const sortBy = computed(() => {
    return products.value.sortBy;
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
    sortBy,
    setSortBy,
    selectedProduct,
    setSelectedProduct,
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
