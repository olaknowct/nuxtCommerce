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
    searchedItem: '',
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

  const setSearchItem = (items, inputVal) => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().startsWith(inputVal.toLowerCase())
    );
    products.value.items = filteredItems;
    products.value.searchedItem = inputVal;
  };

  const addItemToCart = (item) => {
    // products.value.cart.push(item);

    const cartItem = products.value.cart.find((curItem) => curItem.id == item.id);
    if (!cartItem) return products.value.cart.push(item);

    if (cartItem) return (cartItem.quantity += item.quantity);
  };

  const cartTotal = computed(() => {
    return products.value.cart.reduce((acc, item) => item.quantity * item.price + acc, 0);
  });

  const cartTotalCount = computed(() => {
    return products.value.cart?.reduce((acc, item) => item.quantity + acc, 0);
  });

  return {
    products,
    setSearchItem,
    cartTotalCount,
    cartTotal,
    addItemToCart,
    setItems,
    setCategories,
    setSelectedCategory,
    setSortBy,
    setSelectedProduct,
  };
});
