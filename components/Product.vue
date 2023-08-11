<script setup>
const router = useRouter();
const props = defineProps(['product']);
const productRoute = `/products/${props.product.id}`;
const navigateToProduct = () => {
  router.push(productRoute);
};
</script>

<template>
  <li>
    <article
      class="w-70 py-10 bg-neutral-50 shadow-xl rounded-lg flex flex-col items-center text-sm px-4 text-center"
    >
      <img :src="product?.image" class="h-40" :alt="product?.name" />
      <h3 class="text-lg line-clamp-2 h-[56px] font-semibold">
        {{ product?.title }}
      </h3>
      <p class="line-clamp-3 text-zinc-400 mt-2 h-[60px] mb-4">{{ product?.description }}</p>
      <div class="flex justify-between w-full px-2 py-2 font-semibold">
        <p>Price: {{ product?.price }}</p>
        <p>Rating: {{ product?.rating?.rate }}</p>
      </div>
      <button
        @click="navigateToProduct"
        class="rounded-md shadow-lg bg-green-700 text-white px-7 py-2 hover:translate-y-[1px] active:-translate-y-[1px] transition duration-0 hover:duration-50"
      >
        Buy me!
      </button>
    </article>
  </li>
</template>
