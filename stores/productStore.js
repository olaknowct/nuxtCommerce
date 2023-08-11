import { defineStore } from 'pinia';

export const useProductStore = defineStore('products', () => {
  const products = ref({
    items: [],
    categories: [],
    count: 4,
    selectedCategory: 'all',
    sortBy: 'alphabetically',
    selectedProduct: null,
    cart: [],
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

  const addItemToCart = (item) => {
    // products.value.cart.push(item);

    const cartItem = products.value.cart.find((curItem) => curItem.id == item.id);
    if (!cartItem) return products.value.cart.push(item);

    if (cartItem) return (cartItem.quantity += item.quantity);
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

  const cartItems = computed(() => {
    return products.value.cart;
  });
  const sortBy = computed(() => {
    return products.value.sortBy;
  });

  const cartTotal = computed(() => {
    return products.value.cart.reduce((acc, item) => item.quantity * item.price + acc, 0);
  });

  const cartTotalCount = computed(() => {
    return products.value.cart?.reduce((acc, item) => item.quantity + acc, 0);
  });

  // const countComputed = computed(() => {
  //   return products.value.count + 1;
  // });

  return {
    products,
    cartTotalCount,
    cartTotal,
    addItemToCart,
    setItems,
    setCategories,
    selectedCategory,
    selectedItems,
    setSelectedCategory,
    sortBy,
    setSortBy,
    selectedProduct,
    setSelectedProduct,
    cartItems,
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
